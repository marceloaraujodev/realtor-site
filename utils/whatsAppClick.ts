export default function handleWhatsClick() {
  const phone = 554799370126;

  const message = '';

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl);
}