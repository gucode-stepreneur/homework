# คู่มือการติดตั้งและใช้งานระบบบันทึกการบ้าน

## การติดตั้ง

### 1. ตรวจสอบความต้องการของระบบ
- Node.js 18+ 
- MySQL 8.0+
- npm หรือ yarn

### 2. Clone โปรเจค
```bash
git clone <repository-url>
cd homework
```

### 3. ติดตั้ง Dependencies
```bash
npm install
```

### 4. ตั้งค่าฐานข้อมูล

#### 4.1 สร้างฐานข้อมูล MySQL
```sql
CREATE DATABASE homework_db;
```

#### 4.2 สร้างไฟล์ .env
คัดลอกไฟล์ `env.example` เป็น `.env` และแก้ไขการตั้งค่า:

```env
DATABASE_URL="mysql://username:password@localhost:3306/homework_db"
JWT_SECRET="your-secret-key-here"
```

**หมายเหตุ:** แทนที่ `username`, `password` ด้วยข้อมูลการเข้าสู่ระบบ MySQL ของคุณ

### 5. สร้าง Prisma Client และ Database Schema
```bash
npx prisma generate
npx prisma db push
```

### 6. รันโปรเจค
```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## การใช้งาน

### การลงทะเบียนผู้ใช้ใหม่
1. ไปที่หน้าแรก
2. คลิกปุ่ม "ลงทะเบียน"
3. กรอกข้อมูล:
   - ชื่อผู้ใช้ (ต้องไม่ซ้ำกับผู้ใช้อื่น)
   - รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
   - ยืนยันรหัสผ่าน
4. คลิก "ลงทะเบียน"

### การเข้าสู่ระบบ
1. ไปที่หน้าแรก
2. คลิกปุ่ม "เข้าสู่ระบบ"
3. กรอกชื่อผู้ใช้และรหัสผ่าน
4. คลิก "เข้าสู่ระบบ"

### การจัดการการบ้าน

#### เพิ่มการบ้านใหม่
1. หลังล็อกอินแล้ว คลิกปุ่ม "เพิ่มการบ้านใหม่"
2. กรอกข้อมูล:
   - **วิชา** (บังคับ): เช่น คณิตศาสตร์, วิทยาศาสตร์
   - **ชื่อการบ้าน** (บังคับ): ชื่อหรือหัวข้อการบ้าน
   - **รายละเอียด** (ไม่บังคับ): คำอธิบายเพิ่มเติม
   - **วันที่ส่ง** (บังคับ): วันและเวลาที่ต้องส่ง
3. คลิก "บันทึก"

#### แก้ไขสถานะการบ้าน
- คลิกปุ่ม "ทำเสร็จแล้ว" เพื่อเปลี่ยนสถานะเป็น "ส่งแล้ว"
- คลิกปุ่ม "ยังไม่เสร็จ" เพื่อเปลี่ยนกลับเป็น "ยังไม่ส่ง"

#### ลบการบ้าน
- คลิกปุ่ม "ลบ" และยืนยันการลบ

### การดูสถิติ
หน้าแรกจะแสดงสถิติ:
- **การบ้านที่ต้องทำ**: จำนวนการบ้านที่ยังไม่ส่ง
- **การบ้านที่ส่งแล้ว**: จำนวนการบ้านที่ส่งแล้ว
- **การบ้านที่ใกล้กำหนด**: จำนวนการบ้านที่ต้องส่งภายใน 24 ชั่วโมง

### สีของสถานะ
- 🟢 **เขียว**: ส่งแล้ว
- 🔵 **น้ำเงิน**: ยังไม่ส่ง (ปกติ)
- 🟠 **ส้ม**: ใกล้กำหนด (ภายใน 24 ชั่วโมง)
- 🔴 **แดง**: เกินกำหนด

## การแก้ไขปัญหา

### ปัญหาการเชื่อมต่อฐานข้อมูล
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**วิธีแก้:**
1. ตรวจสอบว่า MySQL server กำลังทำงาน
2. ตรวจสอบการตั้งค่า DATABASE_URL ในไฟล์ .env
3. ตรวจสอบสิทธิ์การเข้าถึงฐานข้อมูล

### ปัญหา JWT Token
```
Error: Token ไม่ถูกต้อง
```
**วิธีแก้:**
1. ลบ cookie ของเว็บไซต์
2. ล็อกอินใหม่
3. ตรวจสอบการตั้งค่า JWT_SECRET

### ปัญหา Prisma
```
Error: Prisma Client not found
```
**วิธีแก้:**
```bash
npx prisma generate
```

### ปัญหาการ Build
```bash
npm run build
```
หากมี error ให้ตรวจสอบ:
1. การตั้งค่า environment variables
2. การเชื่อมต่อฐานข้อมูล
3. การ import modules

## คำสั่งที่มีประโยชน์

```bash
# รันโปรเจคในโหมดพัฒนา
npm run dev

# สร้าง build สำหรับ production
npm run build

# รันโปรเจคในโหมด production
npm start

# เปิด Prisma Studio (จัดการฐานข้อมูลผ่าน UI)
npx prisma studio

# รีเซ็ตฐานข้อมูล (ลบข้อมูลทั้งหมด)
npx prisma db push --force-reset

# ตรวจสอบสถานะฐานข้อมูล
npx prisma db pull

# สร้าง migration
npx prisma migrate dev --name init
```

## การ Deploy

### Deploy บน Vercel
1. Push โค้ดไปยัง GitHub
2. เชื่อมต่อกับ Vercel
3. ตั้งค่า Environment Variables ใน Vercel
4. Deploy

### Deploy บน Server
1. Build โปรเจค: `npm run build`
2. รันในโหมด production: `npm start`
3. ตั้งค่า reverse proxy (nginx/apache)

## การพัฒนาต่อ

### เพิ่มฟีเจอร์ใหม่
1. แก้ไข Prisma schema ใน `prisma/schema.prisma`
2. รัน `npx prisma generate` และ `npx prisma db push`
3. สร้าง API routes ใน `src/app/api/`
4. สร้าง UI components ใน `src/app/`

### โครงสร้างไฟล์
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── login/             # หน้าล็อกอิน
│   ├── register/          # หน้าลงทะเบียน
│   ├── homework/          # หน้าจัดการการบ้าน
│   └── page.js            # หน้าหลัก
├── lib/                   # Utilities
│   └── db.js             # Database connection
└── generated/             # Generated files
    └── prisma/           # Prisma client
```

## การสนับสนุน

หากมีปัญหาหรือคำถาม สามารถติดต่อได้ที่:
- Email: [your-email@example.com]
- GitHub Issues: [repository-url]/issues 