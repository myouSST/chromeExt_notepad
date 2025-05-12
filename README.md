# Chrome Native Messaging Example: Notepad 실행

이 프로젝트는 Chrome 확장에서 외부 실행 파일(예: Notepad)을 실행하는 예제입니다.  
브라우저 확장이 Native Host와 JSON 메시지를 주고받으며 통신합니다.

---

## 📁 구성 요소

### chrome_ex
| 파일명             | 설명                              |
|-----------------|---------------------------------|
| `content.js`    | extention <> background 간 브릿지 코드 |
| `background.js` | 확장에서 native host와 통신 코드         |
| `manifest.json` | Chrome 확장 매니페스트                 |
| `test.html`     | 메시지 전송 테스트 페이지                  |

### host 

| 파일명                        | 설명                        |
|----------------------------|---------------------------|
| `com.myhost.notepad.json`  | Native host 설정 파일 (매니페스트) |
| `native-messaging-host.py` | Native host (Python 예제)   |
| `regadd.bat`               | 레지스트리 등록                  |
| `regdel.bat`               | 레지스트리 제거                  |


---

## 📌 동작 방식 요약

1. **확장에서 Native Messaging으로 연결**
2. **Host 실행 파일이 실행되고 메시지를 수신**
3. **Host가 메시지를 처리하고 응답 반환**
4. **확장에서 응답 수신**

---

## 🧪 테스트 방식
1. **chrome_ex 경로 크롬 익스텐션 등록(크롬 익스텐션 ID 획득)**
2. **host 폴더 내부에 있는 regadd.bat 내 경로 변경 (사용자 경로)**
3. **host 폴더 내부에 있는 com.myhost.notepad.json 내 경로 및 익스텐션 ID 변경**
4. **regadd.bat 실행**
5. **test.html 실행**
6. **Send Native Call 버튼 클릭**
7. **메모장 실행 확인**

---

## 🧑‍💻 개발 및 설치 순서

### 1. Native Host 만들기

```bash
# native-messaging-host.py
python 파일을 작성하거나 exe로 빌드하세요.
```

### 2. Native Host 매니페스트 작성
```json
// com.myhost.notepad.json
{
    "name": "com.myhost.notepad",
    "description": "Notepad opener",
    "path": "C:\\FULL\\PATH\\TO\\native-messaging-host.exe",
    "type": "stdio",
    "allowed_origins": ["chrome-extension://<YOUR_EXTENSION_ID>/"]
}
```

### 3. 레지스트리에 등록 (Windows)
```shell
reg add "HKCU\Software\Google\Chrome\NativeMessagingHosts\com.myhost.notepad" /ve /t REG_SZ /d "C:\FULL\PATH\TO\com.myhost.notepad.json"
```


### 4. 크롬 확장 설치
manifest.json 포함 폴더를 크롬 확장페이지(chrome://extensions)에서 "압축해제된 확장 프로그램 로드"로 설치하세요.


https://developer.chrome.com/docs/apps/nativeMessaging?hl=ko