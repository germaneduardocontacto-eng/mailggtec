const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { tvbox, combo, pendrive, airmouse, hub, cable, nombre, apellido, ciudad, telefono, email, notas } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Sistema de Cotizaciones <onboarding@resend.dev>',
      to: ['ggtecnologiaventas@gmail.com'],
      subject: `Nueva Cotización Mayorista - ${nombre} ${apellido} (${ciudad})`,
      html: `
        <h2>¡Nueva Solicitud de Cotización de Distribuidor!</h2>
        <hr/>
        <h3>Datos del Cliente:</h3>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Ciudad / Comuna:</strong> ${ciudad}</p>
        <p><strong>WhatsApp / Teléfono:</strong> ${telefono}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Notas del negocio:</strong> ${notas || 'Ninguna'}</p>
        <hr/>
        <h3>Productos Solicitados:</h3>
        <ul>
          <li><strong>TV Box Ultra 4K + GGAPPS TV:</strong> ${tvbox} unidades</li>
          <li><strong>Combo TV Box + Control Remoto:</strong> ${combo} unidades</li>
          <li><strong>PENDRIVE con Apps:</strong> ${pendrive} unidades</li>
          <li><strong>Control Remoto Air Mouse:</strong> ${airmouse} unidades</li>
          <li><strong>Hub USB-C 7 en 1:</strong> ${hub} unidades</li>
          <li><strong>Cable HDMI 2.1 8K:</strong> ${cable} unidades</li>
        </ul>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

