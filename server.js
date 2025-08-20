import { createServer } from "node:http";
import next from "next";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient();

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

function formatDate(date) {
  return new Date(date).toLocaleString('th-TH', {
    dateStyle: 'full',
    timeStyle: 'short'
  });
}

async function sendLineBroadcast(message) {
  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/broadcast',
      {
        messages: [
          {
            type: 'text',
            text: message
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ ส่งข้อความแจ้งเตือน LINE สำเร็จ');
  } catch (err) {
    console.error('❌ ส่ง LINE ไม่สำเร็จ:', err.response?.data || err.message);
  }
}

async function checkHomework() {
  const now = dayjs().tz('Asia/Bangkok');
  const tolerance = 5; // นาที

  const homeworks = await prisma.homework.findMany({
    where: {
      status: 'ยังไม่ส่ง',
      OR: [
        { beforetwodaynoti: false },
        { beforeonedaynoti: false }
      ]
    },
    include: {
      user: { select: { username: true } }
    }
  });

  let message2 = '';
  let message1 = '';
  let ids2 = [];
  let ids1 = [];

  homeworks.forEach(hw => {
    const due = dayjs.tz(hw.dueDate, 'Asia/Bangkok');
    const diffMinutes = due.diff(now, 'minute');
    // 2 วัน = 2880 นาที, 1 วัน = 1440 นาที
    if (!hw.beforetwodaynoti && diffMinutes <= 2880 + tolerance && diffMinutes >= 2880 - tolerance) {
      // แจ้งเตือน 2 วัน (±5 นาที)
      message2 += `• ${hw.title} (${hw.subject}) - \n👤 ${hw.user.username}\n\n`;
      ids2.push(hw.id);
    }
    if (!hw.beforeonedaynoti && diffMinutes <= 1440 + tolerance && diffMinutes >= 1440 - tolerance) {
      // แจ้งเตือน 1 วัน (±5 นาที)
      message1 += `• ${hw.title} (${hw.subject}) - \n👤 ${hw.user.username}\n\n`;
      ids1.push(hw.id);
    }
  });

  let message = '';
  if (message2) message += '📚 การบ้านเหลือเวลา 2 วัน:\n' + message2;
  if (message1) message += '⚠️ การบ้านเหลือเวลา 1 วัน:\n' + message1;

  if (message) await sendLineBroadcast(message.trim());

  if (ids2.length)
    await prisma.homework.updateMany({ where: { id: { in: ids2 } }, data: { beforetwodaynoti: true } });
  if (ids1.length)
    await prisma.homework.updateMany({ where: { id: { in: ids1 } }, data: { beforeonedaynoti: true } });
}

app.prepare().then(() => {
  // เริ่ม cron
  console.log('📆 ตั้ง cron job เรียบร้อย');
  cron.schedule('*/1 * * * *', async () => {
    console.log('🔔 กำลังตรวจสอบการบ้าน...');
    await checkHomework();
  });

  createServer((req, res) => {
    handler(req, res);
  }).listen(port, () => {
    console.log(`🚀 Server is ready at http://${hostname}:${port}`);
  });
});

