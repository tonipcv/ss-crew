import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/utils/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!verifyAdminToken(authHeader)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Buscar estatísticas de usuários por período
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - 7));
    const startOfMonth = new Date(today.setDate(today.getDate() - 30));

    const [dailyUsers, weeklyUsers, monthlyUsers] = await Promise.all([
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfDay
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfWeek
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth
          }
        }
      })
    ]);

    return NextResponse.json({
      totalMessages: monthlyUsers,
      todayMessages: dailyUsers,
      successRate: Math.round((weeklyUsers / monthlyUsers) * 100) || 0
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({
      totalMessages: 0,
      todayMessages: 0,
      successRate: 0
    }, { status: 500 });
  }
} 