import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const usersFilePath = path.join(process.cwd(), 'data/users.json');

function readUsers() {
  try {
    const fileData = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username y password son requeridos' },
        { status: 400 }
      );
    }

    const users = readUsers();
    
    // Buscar el usuario
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Usuario encontrado
      const userResponse = {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt
      };

      return NextResponse.json({
        success: true,
        message: `¡Bienvenido, ${username}!`,
        user: userResponse
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
