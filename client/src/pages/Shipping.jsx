import { Truck, MapPin, TimerReset, MailCheck, ShieldCheck } from 'lucide-react';

 const ShippingFAQ = () => (
  <div className="px-6 py-10 max-w-5xl mx-auto text-gray-800 mt-10">
    <h1 className="text-4xl font-bold mb-6 text-blue-800">Shipping & Delivery - Frequently Asked Questions</h1>
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex items-start gap-4">
        <Truck className="text-blue-600" />
        <p className="text-lg">We deliver across India via trusted courier partners like <strong>DTDC</strong> and <strong>Delhivery</strong>.</p>
      </div>
      <div className="flex items-start gap-4">
        <MapPin className="text-green-600" />
        <p className="text-lg">We offer <strong>free home delivery within a 5km radius</strong> of Kaliachak, Malda.</p>
      </div>
      <div className="flex items-start gap-4">
        <TimerReset className="text-yellow-500" />
        <p className="text-lg">Orders are <strong>dispatched within 24–48 hours</strong> of confirmation.</p>
      </div>
      <div className="flex items-start gap-4">
        <MailCheck className="text-purple-600" />
        <p className="text-lg">Tracking details are sent via <strong>SMS and email</strong> as soon as your package is shipped.</p>
      </div>
    </div>
  </div>
);

export default ShippingFAQ;