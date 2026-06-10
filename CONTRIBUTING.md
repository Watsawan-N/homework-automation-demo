# Contributing Guide

เอกสารนี้เขียนแบบง่าย ๆ เพื่อให้นักเรียนเริ่ม contribute ได้ทันที

## ขั้นตอนการ contribute

1. create branch

```bash
git checkout -b feature/my-change
```

2. write code

แก้โค้ดในส่วนที่ต้องการ และพยายามตั้งชื่อตัวแปรหรือฟังก์ชันให้อ่านง่าย

3. run build

```bash
npm run build
```

4. run test

```bash
npm run test:e2e
```

5. create PR

push branch ขึ้น GitHub แล้วเปิด Pull Request เพื่อให้เพื่อนหรือครูช่วย review

## ข้อแนะนำ

- แก้ทีละเรื่อง จะ review ง่ายกว่า
- ถ้าเพิ่ม feature ใหม่ ควรเพิ่มหรือแก้ test ให้ตรงกัน
- ถ้าเปลี่ยนวิธีใช้งาน ควรอัปเดต README ด้วย
