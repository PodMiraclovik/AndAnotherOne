# Импортируем необходимые модули
import os
import cv2
import numpy as np
from PIL import Image
from io import BytesIO
from http.server import BaseHTTPRequestHandler

# Определяем класс обработчика запросов
class handler(BaseHTTPRequestHandler):

  # Определяем метод POST
  def do_POST(self):
    # Получаем длину содержимого запроса
    content_length = int(self.headers["Content-Length"])

    # Читаем содержимое запроса в байтах
    data = self.rfile.read(content_length)

    # Преобразуем байты в изображение с помощью PIL
    image = Image.open(BytesIO(data))

    # Преобразуем изображение в массив NumPy с помощью OpenCV
    image = np.array(image)

    # Применяем к изображению какой-то эффект с помощью OpenCV
    # Например, сделаем его черно-белым
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Преобразуем обратно массив в изображение с помощью PIL
    image = Image.fromarray(image)

    # Сохраняем изображение в байтовый поток с помощью PIL
    output = BytesIO()
    image.save(output, format="JPEG")

    # Получаем байты изображения из потока
    output = output.getvalue()

    # Отправляем ответ с кодом 200 и типом содержимого
    self.send_response(200)
    self.send_header("Content-type", "image/jpeg")
    self.end_headers()

    # Пишем байты изображения в тело ответа
    self.wfile.write(output)

    # Завершаем обработку запроса
    return
