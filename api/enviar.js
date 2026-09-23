const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Recibimos los datos del formulario de cotización
  const { nombre, email, producto, mensaje } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Sistema de Cotizaciones <onboarding@resend.dev>',
      to: ['ggtecnologiaventas@gmail.com'],
      subject: `Nueva Solicitud de Cotización de ${nombre}`,
      html: `
        <h2>¡Has recibido una nueva solicitud de cotización!</h2>
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Correo de contacto:</strong> ${email}</p>
        <p><strong>Producto/Servicio de interés:</strong> ${producto}</p>
        <p><strong>Detalles o Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
