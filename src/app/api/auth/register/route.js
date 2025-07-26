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

function writeUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing users:', error);
    return false;
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
    
    // Verificar si el usuario ya existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Este usuario ya está registrado' },
        { status: 409 }
      );
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      username,
      password, // En producción, esto debería estar hasheado
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    
    if (writeUsers(users)) {
      return NextResponse.json({
        success: true,
        message: 'Usuario registrado exitosamente',
        user: { id: newUser.id, username: newUser.username }
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Error al guardar el usuario' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in register API:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
