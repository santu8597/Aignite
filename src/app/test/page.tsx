import React from 'react';

const plansData = [
  {
    "name": "Silver Membership",
    "price": 30,
    "description": "Short-term trial for beginners",
    "validity": "Valid for 12 months",
    "benefits": [
      "Access to all classes Mon - Fri",
      "Free t-shirt",
      "1-on-1 consultation"
    ],
    "buttonColor": "green-500"
  },
  {
    "name": "Gold Membership",
    "price": 45,
    "description": "Ideal for advanced trainers",
    "validity": "Valid for 12 months",
    "benefits": [
      "Personalized program",
      "Four online form coaching sessions",
      "Access to massage therapist",
      "Full nutrition plan"
    ],
    "buttonColor": "purple-500",
    "topSeller": true
  },
  {
    "name": "Platinum Membership",
    "price": 55,
    "description": "Perfect for committed trainers",
    "validity": "Valid for 12 months",
    "benefits": [
      "24/7 Gym access",
      "Custom strength & conditioning program",
      "Weekly mobility training sessions",
      "Four physio sessions per month"
    ],
    "buttonColor": "green-500"
  }
];

const PaymentSection = () => {
  return (
    <div className="flex justify-center items-center py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plansData.map((plan, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {plan.topSeller && (
                <div className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs font-bold mb-2 inline-block">
                  Top seller
                </div>
              )}
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-700 ml-1">/ month</span>
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-sm text-gray-500 mb-4">{plan.validity}</p>
              <button className={`bg-${plan.buttonColor} hover:bg-${plan.buttonColor}-700 text-white font-bold py-2 px-4 rounded-full`}>
                Subscribe now
              </button>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <ul className="list-none">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    <span className="mr-2">&rarr;</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSection;