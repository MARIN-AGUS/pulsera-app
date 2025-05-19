exports.enviarAlerta = (req, res) => {
  const { dispositivoId } = req.body;
  console.log(`🚨 Alerta de pánico recibida desde: ${dispositivoId}`);
  res.status(200).json({ message: 'Alerta enviada a los padres' });
};