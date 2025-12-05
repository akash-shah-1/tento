
import React, { useState } from 'react';
import { User, Lock, Bell, Moon, Shield, HelpCircle, AlertTriangle, ChevronRight, Check, Info, FileText } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CURRENT_USER } from '../data/index';

type SettingsTab = 'account' | 'privacy' | 'notifications' | 'appearance' | 'support' | 'about';

export const Settings: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [theme, setTheme] = useState<'Light' | 'Dark' | 'Auto'>('Light');
  const [fontSize, setFontSize] = useState(16);

  const handleSave = () => {
    showToast('Settings saved successfully');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'support', label: 'Support & Help', icon: HelpCircle },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20 md:pb-0">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 px-4 md:px-0">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card className="overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                  activeTab === tab.id 
                    ? 'bg-primary-50 text-primary-700 border-primary-500' 
                    : 'text-gray-600 hover:bg-gray-50 border-transparent'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'account' && (
            <div className="space-y-6 animate-in fade-in">
              <Card className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Account Information</h2>
                <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                     <input type="text" value={CURRENT_USER.handle} readOnly className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-500" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                     <div className="relative">
                       <input type="email" value="alex@example.com" readOnly className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-500 pr-10" />
                       <Check className="w-4 h-4 text-green-500 absolute right-3 top-3.5" />
                     </div>
                     <span className="text-xs text-green-600 mt-1 inline-block">Verified</span>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                     <input type="tel" placeholder="+1 (555) 000-0000" className="w-full border border-gray-300 rounded-lg p-2.5" />
                   </div>
                </div>
              </Card>

              <Card className="p-6">
                 <h2 className="text-lg font-bold text-gray-900 mb-4">Security</h2>
                 <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                 </div>
                 <div className="border-t border-gray-100 my-4"></div>
                 <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"/>
                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                 </div>
              </Card>

              <Card className="p-6 border-red-100">
                <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
                <p className="text-sm text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">Delete Account</Button>
              </Card>
            </div>
          )}

          {activeTab === 'privacy' && (
             <Card className="p-6 animate-in fade-in">
               <h2 className="text-lg font-bold text-gray-900 mb-6">Privacy Settings</h2>
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                   <select className="w-full border border-gray-300 rounded-lg p-2.5">
                     <option>Public</option>
                     <option>Community Only</option>
                     <option>Private</option>
                   </select>
                 </div>
                 
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Activity Status</p>
                      <p className="text-sm text-gray-500">Show when you're active</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Story Sharing</p>
                      <p className="text-sm text-gray-500">Allow others to share your story</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
                 </div>
               </div>
             </Card>
          )}

          {activeTab === 'notifications' && (
             <Card className="p-6 animate-in fade-in">
               <h2 className="text-lg font-bold text-gray-900 mb-6">Notifications</h2>
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Push Notifications</span>
                    <input 
                      type="checkbox" 
                      checked={pushNotifications} 
                      onChange={(e) => setPushNotifications(e.target.checked)} 
                      className="w-5 h-5 text-primary-600 rounded" 
                    />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Email Notifications</span>
                    <input 
                      type="checkbox" 
                      checked={emailNotifications} 
                      onChange={(e) => setEmailNotifications(e.target.checked)} 
                      className="w-5 h-5 text-primary-600 rounded" 
                    />
                 </div>

                 <div className="pt-4">
                   <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Notify me about</h3>
                   <div className="space-y-3">
                     {['New messages', 'Comments on posts', 'Session reminders', 'Healer updates', 'Mentions'].map((item) => (
                       <label key={item} className="flex items-center space-x-3 cursor-pointer">
                         <input type="checkbox" defaultChecked className="rounded text-primary-500 focus:ring-primary-500" />
                         <span className="text-sm text-gray-700">{item}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               </div>
             </Card>
          )}

          {activeTab === 'appearance' && (
             <Card className="p-6 animate-in fade-in">
               <h2 className="text-lg font-bold text-gray-900 mb-6">Appearance</h2>
               <div className="grid grid-cols-3 gap-4 mb-6">
                  {['Light', 'Dark', 'Auto'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t as any)}
                      className={`p-4 border rounded-xl text-center transition-all ${
                        theme === t ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="block font-semibold text-sm">{t}</span>
                    </button>
                  ))}
               </div>
               
               <div className="mb-6">
                 <div className="flex justify-between mb-2">
                   <p className="font-medium text-gray-900">Font Size</p>
                   <span className="text-sm text-gray-500">{fontSize}px</span>
                 </div>
                 <input 
                   type="range" 
                   min="12" 
                   max="24" 
                   value={fontSize} 
                   onChange={(e) => setFontSize(parseInt(e.target.value))} 
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                 />
                 <div className="flex justify-between text-xs text-gray-400 mt-1">
                   <span>Aa (Small)</span>
                   <span>Aa (Large)</span>
                 </div>
               </div>

               <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-900">Reduce Motion</p>
                    <p className="text-sm text-gray-500">Minimize animations across the app</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
               </div>
             </Card>
          )}

          {activeTab === 'support' && (
            <div className="space-y-4 animate-in fade-in">
              <Card className="p-6 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><HelpCircle /></div>
                   <div>
                     <h3 className="font-bold text-gray-900">Help Center</h3>
                     <p className="text-sm text-gray-500">Guides, FAQs, and resources</p>
                   </div>
                 </div>
                 <ChevronRight className="text-gray-400" />
              </Card>
              <Card className="p-6 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <div className="bg-red-100 p-2 rounded-lg text-red-600"><AlertTriangle /></div>
                   <div>
                     <h3 className="font-bold text-gray-900">Crisis Resources</h3>
                     <p className="text-sm text-gray-500">Immediate support contacts</p>
                   </div>
                 </div>
                 <ChevronRight className="text-gray-400" />
              </Card>
              <Card className="p-6 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <div className="bg-gray-100 p-2 rounded-lg text-gray-600"><Shield /></div>
                   <div>
                     <h3 className="font-bold text-gray-900">Report a Problem</h3>
                     <p className="text-sm text-gray-500">Let us know if something isn't working</p>
                   </div>
                 </div>
                 <ChevronRight className="text-gray-400" />
              </Card>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 animate-in fade-in">
              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-gray-900">HealSpace</h3>
                <p className="text-sm text-gray-600">Version 1.2.0 (Build 2024.08.14)</p>
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 cursor-pointer">
                    <FileText className="w-4 h-4" /> <span>Terms of Service</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 cursor-pointer">
                    <Shield className="w-4 h-4" /> <span>Privacy Policy</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 cursor-pointer">
                    <Check className="w-4 h-4" /> <span>Community Guidelines</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-end pt-4">
            <Button size="lg" onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
