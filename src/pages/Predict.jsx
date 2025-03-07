import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  BeakerIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:5000';

const FEATURES = [
  { key: 'Pregnancies', label: 'Pregnancies' },
  { key: 'Glucose', label: 'Glucose (mg/dL)' },
  { key: 'BloodPressure', label: 'Blood Pressure (mm Hg)' },
  { key: 'SkinThickness', label: 'Skin Thickness (mm)' },
  { key: 'Insulin', label: 'Insulin (μU/mL)' },
  { key: 'BMI', label: 'Body Mass Index' },
  { key: 'DiabetesPedigreeFunction', label: 'Diabetes Pedigree' },
  { key: 'Age', label: 'Age' }
];

function Predict() {
  const [model, setModel] = useState('');
  const [inputData, setInputData] = useState({});
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [aiAdvice, setAiAdvice] = useState('');
  const [models, setModels] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/get_models`)
      .then(response => {
        const pModels = response.data.p_models;
        setModels(pModels);
        if (pModels && pModels.length > 0) {
          setModel(pModels[0]);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch models.');
      });
  }, []);
  const saveToDatabase = async (payload, prediction, aiAdvice) => {
    try {
      await addDoc(collection(db, 'predictions'), {
        ...payload,
        prediction,
        aiAdvice,
        timestamp: new Date()
      });
      toast.success('Prediction saved successfully!');
    } catch (error) {
      console.error('Error saving prediction:', error);
      toast.error('Failed to save prediction.');
    }
  };

  const handleInputChange = (feature, value) => {
    setInputData(prev => ({
      ...prev,
      [feature]: value,
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...inputData,
        model,
        customPrompt,
      };
      const response = await axios.post(`${BASE_URL}/predict`, payload);
      setPrediction(response.data.prediction);
      setAiAdvice(response.data.ai_advice);
      await saveToDatabase(payload, response.data.prediction, response.data.ai_advice);
      toast.success('Analysis completed successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to complete assessment. Please check your inputs and try again.');
      toast.error('Assessment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputData({});
    setCustomPrompt('');
    setPrediction('');
    setAiAdvice('');
    setError('');
    toast.info('Form cleared');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-[2rem] shadow-2xl border-2 border-emerald-100 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8 space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center bg-emerald-100 p-4 rounded-full shadow-md">
            <HeartIcon className="w-12 h-12 text-emerald-600 animate-heartbeat" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Diabetes Risk Analyzer
            <span className="block text-lg font-normal text-gray-500 mt-2">AI-Driven Health Assessment</span>
          </h1>
        </div>

        {/* Model Selection */}
        <div className="mb-6 group animate-fade-in-up">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5 text-emerald-500" />
            <span>Analysis Model</span>
          </label>
          <div className="relative">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none appearance-none bg-white text-gray-700"
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {FEATURES.map((feature) => (
            <div key={feature.key} className="space-y-1 animate-fade-in-up">
              <label className="text-sm font-medium text-gray-600">{feature.label}</label>
              <div className="relative">
                <input
                  type="number"
                  onChange={(e) => handleInputChange(feature.key, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none bg-white text-gray-700 placeholder-gray-400 pr-12"
                  placeholder="–"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-emerald-500">
                  {feature.key === 'BMI' ? 'kg/m²' : feature.key === 'BloodPressure' ? 'mmHg' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Notes */}
        <div className="mb-6 animate-fade-in-up">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center space-x-2">
            <BeakerIcon className="w-5 h-5 text-emerald-500" />
            <span>Clinical Notes</span>
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none bg-white text-gray-700 placeholder-gray-400"
            placeholder="Example: Family history of diabetes, recent symptoms..."
            rows="3"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2 animate-fade-in-up"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Analyzing Biomarkers...</span>
              </>
            ) : (
              <>
                <ShieldCheckIcon className="w-5 h-5" />
                <span>Generate Health Report</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center space-x-2 animate-fade-in">
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {prediction && (
            <div className="mt-6 space-y-4 animate-fade-in-up">
              <div className={`p-4 rounded-xl border-2 ${
                prediction === 'Diabetic' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-emerald-50 border-emerald-200'
              } flex items-center space-x-2`}>
                <CheckCircleIcon className={`w-5 h-5 ${
                  prediction === 'Diabetic' ? 'text-red-500' : 'text-emerald-500'
                }`} />
                <span className={`font-semibold ${
                  prediction === 'Diabetic' ? 'text-red-700' : 'text-emerald-700'
                }`}>
                  Clinical Assessment: {prediction}
                </span>
              </div>
              
              {aiAdvice && (
                <div className="p-4 bg-teal-50 border-2 border-teal-200 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <ShieldCheckIcon className="w-5 h-5 text-teal-600" />
                    <h3 className="text-sm font-semibold text-teal-600">PREVENTIVE CARE RECOMMENDATIONS</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{aiAdvice}</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleClear}
            className="w-full text-gray-600 hover:text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 group animate-fade-in-up"
          >
            <ArrowPathIcon className="w-5 h-5 text-gray-500 group-hover:rotate-180 transition-transform" />
            <span>Reset Analyzer</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Predict;