import React, { useState } from "react";
import { Users, Lock, ChevronDown, Trash2, Mail, Plus, CheckCircle, ShieldAlert } from "lucide-react";
import { Member } from "../types";

interface CollaboratorsScreenProps {
  members: Member[];
  onAddMember: (name: string, email: string) => void;
  onRemoveMember: (id: string) => void;
  onChangeRole: (id: string, role: "Owner" | "Can edit" | "Can view") => void;
  onSave: () => void;
  onFocusInput: (inputId: "email" | "name") => void;
  focusedInput: string | null;
  emailInput: string;
  setEmailInput: (val: string) => void;
  nameInput: string;
  setNameInput: (val: string) => void;
}

export default function CollaboratorsScreen({
  members,
  onAddMember,
  onRemoveMember,
  onChangeRole,
  onSave,
  onFocusInput,
  focusedInput,
  emailInput,
  setEmailInput,
  nameInput,
  setNameInput,
}: CollaboratorsScreenProps) {
  const [accessOpen, setAccessOpen] = useState(false);
  const [accessType, setAccessType] = useState<"Only invited people" | "Anyone with link">("Only invited people");
  const [notifyMsg, setNotifyMsg] = useState<string | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;
    onAddMember(nameInput, emailInput);
    setNameInput("");
    setEmailInput("");
    triggerToast("Collaborator added to local pending state!");
  };

  const triggerToast = (msg: string) => {
    setNotifyMsg(msg);
    setTimeout(() => setNotifyMsg(null), 3500);
  };

  const handleSaveClick = () => {
    onSave();
    triggerToast("Permissions synchronized with Cloud database!");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#090d16] text-white overflow-y-auto px-4 pb-14 select-none scrollbar-thin">
      
      {/* Top Header Panel */}
      <div className="flex items-center justify-between py-4 border-b border-white/5 mb-4 sticky top-0 bg-[#090d16]/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-500/25 flex items-center justify-center border border-pink-500/40">
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">Members</h1>
            <p className="text-[10px] text-slate-400">Manage listing permission levels</p>
          </div>
        </div>
        <button 
          onClick={handleSaveClick}
          className="text-xs bg-pink-500 hover:bg-pink-600 px-3 py-1.5 rounded-full font-bold select-none cursor-pointer tracking-wide shadow-md active:scale-95 transition-all"
          id="btn-save-member-roles"
        >
          Save
        </button>
      </div>

      {/* Floating Dynamic Notification Banner */}
      {notifyMsg && (
        <div className="bg-emerald-500/90 backdrop-blur-lg border border-emerald-400/30 text-white rounded-lg p-2.5 mb-4 text-xs font-medium flex items-center gap-2 animate-bounce shadow-lg z-20">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-200" />
          <span>{notifyMsg}</span>
        </div>
      )}

      {/* ACCESS OPTION LIST CARD */}
      <div className="bg-slate-900/60 rounded-2xl p-4 border border-white/5 mb-4 relative">
        <label className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold block mb-1">General Access</label>
        
        <div 
          onClick={() => setAccessOpen(!accessOpen)}
          className="flex items-center justify-between bg-slate-950/70 p-3 rounded-xl border border-white/5 cursor-pointer hover:border-[#a855f7]/40 transition-colors"
          id="btn-toggle-access"
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-slate-350" />
            <div>
              <p className="text-xs font-semibold">{accessType}</p>
              <p className="text-[9px] text-slate-400">Strictly authenticated suppliers</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {accessOpen && (
          <div className="absolute left-4 right-4 top-[84px] bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 z-40 animate-fade-in">
            {["Only invited people", "Anyone with link"].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setAccessType(option as any);
                  setAccessOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-900/80 transition-colors flex items-center justify-between"
              >
                <span>{option}</span>
                {accessType === option && (
                  <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ADD MEMBER FORM (Simulating interactive additions) */}
      <form onSubmit={handleAddSubmit} className="bg-slate-900/60 rounded-2xl p-4 border border-white/5 mb-4">
        <label className="text-[10px] uppercase tracking-widest text-pink-400 font-bold block mb-2">Invite Collaborator</label>
        
        <div className="flex flex-col gap-2.5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450 text-[10px] uppercase font-bold">NAME</span>
            <input
              type="text"
              id="member-input-name"
              placeholder="Teammate's name"
              value={nameInput}
              onFocus={() => onFocusInput("name")}
              readOnly
              className={`w-full bg-slate-950/80 border text-xs rounded-xl pl-14 pr-3 py-2.5 outline-none font-medium transition-all ${
                focusedInput === "name" ? "border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.2)]" : "border-white/5"
              }`}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
            </span>
            <input
              type="email"
              id="member-input-email"
              placeholder="teammate@company.com"
              value={emailInput}
              onFocus={() => onFocusInput("email")}
              readOnly
              className={`w-full bg-slate-950/80 border text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none font-medium transition-all ${
                focusedInput === "email" ? "border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.2)]" : "border-white/5"
              }`}
            />
          </div>

          {/* Quick instructions indicator */}
          <p className="text-[9px] text-slate-400 italic">
            * Tap input fields above to select, then click virtual keys on Phone 3 to type!
          </p>

          <button
            type="submit"
            className="w-full text-center bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 hover:text-white border border-pink-500/30 text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            id="btn-submit-add-member"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Invite Team Member</span>
          </button>
        </div>
      </form>

      {/* ROSTER LIST GROUP */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#0ea5e9] font-bold">
          <span>Active Roster</span>
          <span>{members.length} Users</span>
        </div>

        <div className="space-y-2.5">
          {members.map((member) => (
            <div 
              key={member.id} 
              className={`bg-slate-900/40 p-3 rounded-2xl border transition-colors flex items-center justify-between ${
                member.role === "Owner" ? "border-amber-500/20" : "border-white/5 hover:border-slate-800"
              }`}
            >
              {/* Profile Details */}
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className={`w-9 h-9 rounded-full object-cover border-2 shrink-0 ${
                    member.role === "Owner" ? "border-amber-500" : "border-pink-500/30"
                  }`} 
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold flex items-center gap-1.5 truncate">
                    {member.name}
                    {member.role === "Owner" && (
                      <span className="bg-amber-500/20 text-amber-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase scale-90 border border-amber-500/30">
                        Owner
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{member.email}</p>
                </div>
              </div>

              {/* Roles Dropdown or Delete Actions if not Owner */}
              <div className="flex items-center gap-1.5 ml-2">
                {member.role !== "Owner" ? (
                  <>
                    <select
                      value={member.role}
                      onChange={(e) => onChangeRole(member.id, e.target.value as any)}
                      id={`select-role-${member.id}`}
                      className="bg-slate-950 border border-white/5 text-[10px] text-slate-200 rounded-lg py-1 px-1.5 focus:outline-none focus:border-pink-400 cursor-pointer"
                    >
                      <option value="Can edit">Can edit</option>
                      <option value="Can view">Can view</option>
                    </select>
                    <button
                      onClick={() => {
                        onRemoveMember(member.id);
                        triggerToast(`Removed ${member.name} from listing roster.`);
                      }}
                      id={`btn-remove-${member.id}`}
                      className="text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                      title="Remove Collaborator"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <span className="text-[9px] font-semibold text-slate-450 mr-2 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-500" /> Admin
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
