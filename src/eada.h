#ifndef EADA_H
#define EADA_H

#include <napi.h>
#include <faiss/IndexHNSW.h>
#include <faiss/index_io.h>
#include <vector>
#include <memory>

Napi::Value IndexKNN(const Napi::CallbackInfo& info);
Napi::Value SearchKNN(const Napi::CallbackInfo& info);
Napi::Value LoadIndex(const Napi::CallbackInfo& info);
Napi::Value SaveIndex(const Napi::CallbackInfo& info);

#endif
