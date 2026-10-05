/** A lightweight water-refraction layer. The original image is always the fallback. */
function initializeOcean() {
  const scene = document.querySelector<HTMLElement>(".ocean-scene");
  const canvas = scene?.querySelector<HTMLCanvasElement>(".ocean-canvas");
  const image = scene?.querySelector<HTMLImageElement>(".ocean-image");
  if (!scene || !canvas || !image) return;
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl) return;

  const vertexSource = `
    attribute vec2 position;
    varying vec2 uv;
    void main() { uv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D ocean;
    uniform vec2 resolution;
    uniform vec2 imageSize;
    uniform vec2 pointer;
    uniform float time;
    uniform float surge;
    void main() {
      float viewportAspect = resolution.x / resolution.y;
      float imageAspect = imageSize.x / imageSize.y;
      vec2 cover = vec2(min(1.0, viewportAspect / imageAspect), min(1.0, imageAspect / viewportAspect));
      vec2 sampleUV = (uv - 0.5) * cover + 0.5;
      float water = 1.0 - smoothstep(0.27, 0.47, sampleUV.y);
      float nearWater = 1.0 - smoothstep(0.0, 0.44, sampleUV.y);
      float flow = sin(sampleUV.y * 43.0 - time * 0.65 + sampleUV.x * 8.0);
      float swell = sin(sampleUV.x * 21.0 + time * 0.43 + flow * 0.45);
      sampleUV.x += water * (flow * 0.0025 + sin(sampleUV.y * 93.0 + time * 0.8) * 0.0007) * (1.0 + surge * 3.2);
      sampleUV.y += water * swell * (0.0015 + nearWater * 0.0015) * (1.0 + surge * 2.5);
      float ripple = sin(distance(uv, pointer) * 28.0 - time * 1.1) * exp(-distance(uv, pointer) * 5.0);
      sampleUV += vec2(ripple * 0.0016, ripple * 0.001) * water;
      sampleUV = (sampleUV - 0.5) * (1.0 - surge * 0.025) + 0.5;
      vec3 color = texture2D(ocean, clamp(sampleUV, 0.002, 0.998)).rgb;
      color += vec3(0.01, 0.025, 0.033) * surge * water;
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Shader unavailable");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      throw new Error("Shader unsupported");
    }
    return shader;
  };
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) return;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return;
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  const locations = Object.fromEntries(
    ["ocean", "resolution", "imageSize", "pointer", "time", "surge"].map(
      (key) => [key, gl.getUniformLocation(program, key)],
    ),
  );
  gl.uniform1i(locations.ocean, 0);
  const root = document.documentElement;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let visible = true,
    ready = false,
    lost = false,
    frame = 0,
    last = 0,
    elapsed = 0,
    surge = 0;
  let pointerX = 0.5,
    pointerY = 0.2;
  const shouldAnimate = () =>
    ready &&
    !lost &&
    visible &&
    !document.hidden &&
    !reducedMotion.matches &&
    root.dataset.motion !== "paused";
  const resize = () => {
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.round(scene.clientWidth * ratio);
    canvas.height = Math.round(scene.clientHeight * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(locations.resolution, canvas.width, canvas.height);
  };
  const draw = (now: number) => {
    frame = 0;
    if (!shouldAnimate()) return;
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    elapsed += delta;
    const target = root.classList.contains("is-hyperspace") ? 1 : 0;
    surge += (target - surge) * 0.055;
    gl.uniform1f(locations.time, elapsed);
    gl.uniform1f(locations.surge, surge);
    gl.uniform2f(locations.pointer, pointerX, pointerY);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    canvas.classList.add("is-ready");
    frame = requestAnimationFrame(draw);
  };
  const sync = () => {
    if (shouldAnimate()) {
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    }
  };
  const upload = () => {
    if (!image.naturalWidth || lost) return;
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(
        locations.imageSize,
        image.naturalWidth,
        image.naturalHeight,
      );
      ready = true;
      resize();
      sync();
    } catch {
      canvas.classList.remove("is-ready");
      ready = false;
    }
  };
  image.addEventListener("load", upload);
  if (image.complete) upload();
  new ResizeObserver(() => {
    resize();
    sync();
  }).observe(scene);
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      sync();
    },
    { threshold: 0 },
  ).observe(scene);
  new MutationObserver(sync).observe(root, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  reducedMotion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  scene.parentElement?.addEventListener(
    "pointermove",
    (event) => {
      if (!shouldAnimate() || event.pointerType === "touch") return;
      const rect = scene.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width;
      pointerY = 1 - (event.clientY - rect.top) / rect.height;
    },
    { passive: true },
  );
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    lost = true;
    canvas.classList.remove("is-ready");
    sync();
  });
  canvas.addEventListener("webglcontextrestored", () => {
    canvas.classList.remove("is-ready");
  });
}
try {
  initializeOcean();
} catch {
  /* The static artwork is an intentional fallback. */
}
