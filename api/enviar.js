import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405.json({ error: 'Método no permitido' }));
  }

  const { nombre, email, mensaje } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Formulario Web <onboarding@resend.dev>',
      to: ['ggtecnologiaventas@gmail.com'], // <-- CAMBIA ESTO POR TU CORREO REAL
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <h2>Has recibido un nuevo mensaje desde tu web:</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
