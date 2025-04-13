# 🧠 Flask API - Trash to Cash ML

Folder ini berisi source code untuk menjalankan model `.pkl` (hasil training ML) sebagai REST API menggunakan Flask.  
API ini digunakan oleh tim Backend untuk diintegrasikan dengan sistem Trash to Cash.

---

## 🚀 Cara Menjalankan API

### 1. Aktifkan Virtual Environment (kalau belum)
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
```

### 2. Install Dependency
```bash
pip install -r requirements.txt
```

### 3. Jalankan API
```bash
python model_api.py
```

#### API akan berjalan di:
```bash
http://localhost:5000
```

---

## 🌍 Akses Publik via Ngrok (opsional)

Jika ingin diakses dari luar (misal untuk tim Frontend):
```bash
ngrok.exe http 5000
```

Copy URL publik (misal: https://xxxx.ngrok-free.app) dan kirim ke tim Frontend.

---

## 📮 Endpoint

GET /
- Cek status API.
- Response: "ML Model API is running!"

POST /predict
- Kirim input array berisi 12288 angka.
- Format request:
```bash
{
  "features": [0.1, 0.2, ..., 0.0]  // total 12288 angka float
}
```

- Response:
```bash
{
  "prediction": 1
}
```
