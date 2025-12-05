
import React, { useState } from 'react';
import { CheckCircle, Upload, CreditCard, User, FileText, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface BecomeHealerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BecomeHealerModal: React.FC<BecomeHealerModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-blue-50 p-4 rounded-xl mb-4">
              <h3 className="font-bold text-blue-900">Application Info</h3>
              <p className="text-sm text-blue-700 mt-1">Tell us about your practice and expertise.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
              <input type="text" placeholder="e.g. Clinical Psychologist" className="w-full border border-gray-300 rounded-lg p-2.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5">
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>5-10 Years</option>
                <option>10+ Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specializations (Select up to 3)</label>
              <div className="grid grid-cols-2 gap-2">
                {['Trauma', 'Anxiety', 'Somatic', 'Art Therapy', 'Grief', 'Family'].map(spec => (
                  <label key={spec} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary-500" />
                    <span className="text-sm text-gray-600">{spec}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900">Upload Credentials</h3>
              <p className="text-sm text-gray-500">Please upload your license or certification.</p>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
               <FileText className="w-10 h-10 text-gray-400 mb-2" />
               <span className="text-sm font-medium text-primary-600">Click to upload document</span>
               <span className="text-xs text-gray-400 mt-1">PDF, JPG, or PNG (Max 5MB)</span>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg flex items-start">
              <span className="text-yellow-500 mr-2">ℹ️</span>
              <p className="text-xs text-yellow-800">Verification typically takes 24-48 hours. Your profile will maintain "Pending" status until verified.</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-xl text-white text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-80" />
              <h3 className="font-bold text-lg">Connect Payouts</h3>
              <p className="text-sm opacity-90 mt-1">We use Stripe to ensure you get paid securely and on time.</p>
            </div>
            <div className="space-y-3">
              <Button fullWidth className="bg-[#635BFF] hover:bg-[#5851E2] text-white py-3">
                Connect with Stripe
              </Button>
              <p className="text-xs text-center text-gray-500">You will be redirected to Stripe to complete onboarding.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-8 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h2>
            <p className="text-gray-500 mb-8">We have received your details. You can track your verification status in your profile settings.</p>
            <Button fullWidth onClick={onClose}>Back to Profile</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={step === 4 ? "Success" : `Become a Healer (${step}/3)`}>
      <div className="min-h-[300px] flex flex-col">
        {step < 4 && (
          <div className="flex items-center space-x-2 mb-6 justify-center">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 rounded-full flex-1 max-w-[60px] transition-colors ${step >= i ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        )}
        
        <div className="flex-1">
          {renderStepContent()}
        </div>

        {step < 4 && (
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
            {step > 1 && (
              <Button variant="ghost" onClick={() => setStep(s => s - 1)} className="mr-2">Back</Button>
            )}
            <Button onClick={() => setStep(s => s + 1)}>
              {step === 3 ? 'Submit Application' : 'Next Step'} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
