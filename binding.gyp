{
  "targets": [
    {
      "target_name": "eada",
      "sources": ["src/eada.cpp"],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include\")",
        "./node_modules/node-addon-api",
        "./include",
        "/usr/local/include"
      ],
      "libraries": [
        "-L./lib", "-lfaiss"
      ],
      "cflags": ["-std=c++17", "-fexceptions", "-frtti", "-fopenmp"],
      "cflags_cc": ["-std=c++17", "-fexceptions", "-frtti", "-fopenmp"],
      "ldflags": [
        "-Wl,-rpath,./lib"
      ],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
    }
  ]
}