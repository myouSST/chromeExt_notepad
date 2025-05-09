# native-messaging-host.py
import sys
import struct
import subprocess
import json

def read_message():
    raw_length = sys.stdin.buffer.read(4)
    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('<I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)  # 받은 메시지 파싱

def send_message(message):
    encoded = json.dumps(message).encode('utf-8')  # JSON 직렬화
    sys.stdout.buffer.write(struct.pack('<I', len(encoded)))
    sys.stdout.buffer.write(encoded)
    sys.stdout.flush()

while True:
    message = read_message()
    print('test')
    print("Received message:", message)
    if 'open_notepad' in message:
        subprocess.Popen(['notepad.exe'])
        send_message({"status": "success", "message": "Notepad opened"})
