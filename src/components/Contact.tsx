import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { createReservation } from '../lib/sanity';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await createReservation({
        ...formData,
        guests: parseInt(formData.guests)
      });
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '2'
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to make reservation. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">Get in touch or make a reservation</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Make a Reservation</h3>
            {status === 'success' ? (
              <div className="bg-green-50 p-4 rounded-md mb-6">
                <p className="text-green-800">
                  Reservation submitted successfully! We'll contact you shortly to confirm your booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-800">{errorMessage}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors ${
                    status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'loading' ? 'Submitting...' : 'Reserve Table'}
                </button>
              </form>
            )}
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">123 Gourmet Street, Culinary District, City, 12345</p>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-amber-600 mr-3" />
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-amber-600 mr-3" />
                  <p className="text-gray-600">reservations@gusto.com</p>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">Mon-Thu: 11:00 AM - 10:00 PM</p>
                    <p className="text-gray-600">Fri-Sat: 11:00 AM - 11:00 PM</p>
                    <p className="text-gray-600">Sun: 11:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md h-[300px]">
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;