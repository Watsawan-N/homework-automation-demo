# homework-automation-demo

โปรเจกต์นี้เป็นตัวอย่างงานจริงสำหรับสอนนักเรียนเรื่อง Web Automation, GitHub และ CI/CD ผ่านเว็บแอปเล็ก ๆ ชื่อ `Homework Automation Dashboard` ที่เก็บข้อมูลด้วย `localStorage` และทดสอบด้วย Playwright

## คู่มือฉบับเต็ม

ดูคู่มือแบบละเอียดตั้งแต่สร้างโปรเจกต์ Demo, ตั้งค่า Playwright, Pipeline, Report/Trace, CI/CD และการนำขึ้น GitHub ได้ที่ไฟล์ `GUIDE_TH.md`

## โปรเจกต์นี้คืออะไร

โปรเจกต์นี้คือเว็บสำหรับบันทึกการบ้านของนักเรียน แล้วใช้กฎอัตโนมัติช่วยบอกว่า งานไหนเร่งด่วน งานไหนควรทำก่อน และงานไหนสามารถวางแผนล่วงหน้าได้

## Automation คืออะไร

Automation คือการให้คอมพิวเตอร์ช่วยทำงานซ้ำ ๆ แทนเรา เช่น เปิดเว็บ กดปุ่ม กรอกฟอร์ม ตรวจผลลัพธ์ และเช็กว่าระบบยังทำงานถูกต้องอยู่หรือไม่ โดยในโปรเจกต์นี้เราใช้ Playwright เพื่อทดสอบหน้าเว็บอัตโนมัติ

## โครงสร้างโปรเจกต์

```text
homework-automation-demo/
|- .github/
|  |- ISSUE_TEMPLATE/
|  |- workflows/
|  `- pull_request_template.md
|- src/
|  |- components/
|  |- lib/
|  |- App.tsx
|  |- main.tsx
|  `- styles.css
|- tests/
|  `- e2e/
|- playwright.config.ts
|- CONTRIBUTING.md
|- package.json
`- README.md
```

## เวอร์ชัน Node.js ที่ต้องใช้

โปรเจกต์นี้ใช้ Node.js `20` เป็นอย่างน้อย และมีไฟล์ `.nvmrc` กับ `.node-version` ให้แล้ว

ถ้าเครื่องมี `nvm` อยู่แล้ว แนะนำให้เริ่มด้วยคำสั่งนี้:

```bash
npm run setup
```

คำสั่งนี้จะสลับไปใช้ Node เวอร์ชันของโปรเจกต์และรัน `npm install` ให้

## วิธีติดตั้ง

```bash
npm install
```

## วิธี run web

```bash
npm run dev
```

จากนั้นเปิด `http://localhost:5173`

## วิธี run test

```bash
npm run test:e2e
```

ถ้ายังไม่เคยสลับ Node มาก่อน ให้รัน `npm run setup` ครั้งแรกก่อน

ตัวเลือกเพิ่มเติม:

```bash
npm run test:e2e:headed
npm run test:e2e:ui
```

## วิธีเปิด Playwright report

```bash
npm run test:e2e:report
```

Playwright จะเปิดรายงาน HTML จากโฟลเดอร์ `playwright-report`

## วิธีดู trace

เมื่อ test fail และมีการ retry ให้ดูไฟล์ trace จาก artifact หรือจากโฟลเดอร์ `test-results` แล้วเปิดด้วยคำสั่ง:

```bash
npx playwright show-trace path/to/trace.zip
```

## วิธีใช้งาน Git เบื้องต้น

คำสั่งที่ใช้บ่อย:

```bash
git status
git add .
git commit -m "feat: add homework dashboard"
git log --oneline
```

## วิธีสร้าง GitHub repository

1. เข้า GitHub
2. กดปุ่ม `New repository`
3. ตั้งชื่อ repository เป็น `homework-automation-demo`
4. เลือกว่าจะเป็น `Public` หรือ `Private`
5. กด `Create repository`

## วิธี push project ขึ้น GitHub

```bash
git init
git add .
git commit -m "feat: initial project setup"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## วิธีสร้าง branch

```bash
git checkout -b feature/add-new-test
```

## วิธี commit

```bash
git add .
git commit -m "feat: improve homework automation rules"
```

## วิธีเปิด Pull Request

1. push branch ขึ้น GitHub
2. เข้า repository บน GitHub
3. กด `Compare & pull request`
4. เขียนหัวข้อและคำอธิบายสั้น ๆ
5. ตรวจ checklist แล้วกด `Create pull request`

## วิธีดู GitHub Actions

1. เข้า repository บน GitHub
2. ไปที่แท็บ `Actions`
3. เลือก workflow `CI - Build and Playwright Tests`
4. ดูผล build, test และ artifact

## วิธี download test artifact

1. เปิด workflow run ที่ต้องการ
2. เลื่อนลงมาที่ส่วน `Artifacts`
3. ดาวน์โหลด `playwright-report` หรือ `test-results`
4. แตกไฟล์ zip เพื่อดู HTML report, screenshot, video หรือ trace

## Teaching guide สำหรับครู/ผู้สอน

แนวทางสอนที่แนะนำ:

1. เริ่มจากให้เด็กลองใช้เว็บด้วยมือก่อน เพื่อเข้าใจ business rule
2. อธิบายว่าทำไมงานที่ due date ต่างกันจึงได้ priority ไม่เหมือนกัน
3. สอนให้นักเรียนอ่าน `data-testid` และเชื่อมโยงกับ Playwright test
4. ให้เด็กทดลองทำ test ใหม่ 1 เคสก่อน แล้วค่อยอธิบาย CI บน GitHub Actions
5. ใช้ report, screenshot และ trace เป็นเครื่องมือสอนการ debug

## แบบฝึกหัดต่อยอดสำหรับนักเรียน

ตัวอย่างโจทย์ต่อยอด:

1. เพิ่ม filter ตามวิชา
2. เพิ่มปุ่มแก้ไขการบ้าน
3. เพิ่มการ sort ตาม due date
4. เพิ่มสถานะว่าเริ่มทำแล้วหรือยัง
5. เขียน test เพิ่มสำหรับปุ่ม `Load Demo Data`
6. ลองแก้กฎ automation แล้วอัปเดต test ให้ตรงกับกฎใหม่

## วิธีอธิบายโปรเจกต์นี้ให้นักเรียนเข้าใจ

อธิบายสั้น ๆ ได้ว่า:

> เราสร้างเว็บสำหรับบันทึกการบ้าน และใช้ automation test ช่วยตรวจว่าเว็บยังทำงานถูกต้องทุกครั้งที่มีการแก้โค้ด เมื่อ push ขึ้น GitHub ระบบ CI จะ build และรัน test ให้โดยอัตโนมัติ
