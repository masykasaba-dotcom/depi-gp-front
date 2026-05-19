import { useState, useEffect, use } from "react";
import useGetProfileData from "../hooks/useGetProfileData";
import useGetSkinProfile from "../hooks/useGetSkinProfile";
import AccountLayout from "../layouts/AccountLayout";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import apiUrl from "../../shared/utils/apiUrl";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

export default function Profile() {
  const { isError, isLoading, profileData } = useGetProfileData();
  const { data: skinProfileData } = useGetSkinProfile();
  const skinProfile = skinProfileData?.data;
  const { token } = use(AuthContext);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        phone: profileData.phone || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.put(
        `${apiUrl}profile`,
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["handleGetProfile"] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm animate-pulse">
          <div className="h-16 w-full bg-[#EAEAEA] rounded-xl mb-8" />
          <div className="space-y-4">
            <div className="h-10 w-full bg-[#EAEAEA] rounded" />
            <div className="h-10 w-full bg-[#EAEAEA] rounded" />
          </div>
        </div>
      </AccountLayout>
    );
  }

  if (isError) {
    return (
      <AccountLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-display-lg text-[15px] font-semibold text-red-700 mb-1">
            Failed to load profile details
          </p>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <form onSubmit={handleSaveChanges} className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm mb-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#E8EFF0] flex items-center justify-center text-[18px] font-display-lg text-[#06373A] uppercase shrink-0">
            {profileData?.first_name?.[0]}{profileData?.last_name?.[0]}
          </div>
          <div>
            <h2 className="font-display-lg text-[22px] text-[#06373A] leading-tight">
              {profileData?.first_name} {profileData?.last_name}
            </h2>
            <p className="font-body-md text-[13px] text-[#555a5b]">
              Member since {new Date(profileData?.created_at).getFullYear() || "2023"}
            </p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profileData?.email || ""}
              disabled
              className="w-full h-11 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold tracking-wider uppercase text-[#06373A] mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full h-11 px-4 border border-[#E8E4DE] rounded-xl text-sm bg-white outline-none focus:border-[#06373A] transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#E8E4DE]/50">
          <button
            type="button"
            className="text-[13px] font-bold text-[#06373A] px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#032b26] text-white text-[12px] font-semibold tracking-widest uppercase px-6 py-3 rounded-lg hover:bg-[#06373A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Clinical Skin Profile Area */}
      <div className="bg-white border border-[#E8E4DE] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 lg:p-8 flex flex-col md:flex-row md:items-start justify-between relative bg-[#FAF9F6]/50">
          <div className="mb-6 md:mb-0 z-10 flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display-lg text-[20px] text-[#06373A]">
                Clinical Skin Profile
              </h3>
              <Link to="/profile/updateSurvey" className="md:hidden text-[11px] font-bold tracking-wider uppercase text-[#06373A] hover:text-[#032b26] transition-colors flex items-center gap-1 group">
                Retake Quiz
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <p className="font-body-md text-[13px] text-[#555a5b] max-w-md">
              {profileData?.skin_profile 
                ? "Based on your recent diagnostic quiz, these parameters guide your personalized regimen recommendations."
                : skinProfile 
                  ? "Based on your recent diagnostic quiz, these parameters guide your personalized regimen recommendations."
                  : "You haven't completed your clinical diagnostic quiz yet. Complete it to receive personalized regimen recommendations."}
            </p>
          </div>
          <Link to={skinProfile ? "/profile/updateSurvey" : "/profile/survey"} className="hidden md:flex z-10 text-[11px] font-bold tracking-wider uppercase text-[#06373A] hover:text-[#032b26] transition-colors items-center gap-1 pt-1 group">
            {skinProfile ? "Retake Quiz" : "Take Quiz"}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {/* Quiz Params inside the same card border */}
        {skinProfile && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8E4DE] border-t border-[#E8E4DE]">
            <div className="bg-white p-6 flex flex-col items-center justify-center text-center group">
              <div className="w-10 h-10 rounded-full bg-[#E8EFF0] flex items-center justify-center text-[#06373A] mb-3 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">Primary Type</span>
              <span className="text-[13px] font-semibold text-[#06373A] capitalize">
                {skinProfile.skin_type || "N/A"}
              </span>
            </div>
            <div className="bg-white p-6 flex flex-col items-center justify-center text-center group">
              <div className="w-10 h-10 rounded-full bg-[#E8EFF0] flex items-center justify-center text-[#06373A] mb-3 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">Main Concern</span>
              <span className="text-[13px] font-semibold text-[#06373A] capitalize">
                {skinProfile.primary_concern || "N/A"}
              </span>
            </div>
            <div className="bg-white p-6 flex flex-col items-center justify-center text-center group">
              <div className="w-10 h-10 rounded-full bg-[#E8EFF0] flex items-center justify-center text-[#06373A] mb-3 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">Sensitivity</span>
              <span className="text-[13px] font-semibold text-[#06373A] capitalize">
                {skinProfile.sensitivity_level || "N/A"}
              </span>
            </div>
            <div className="bg-white p-6 flex flex-col items-center justify-center text-center group">
              <div className="w-10 h-10 rounded-full bg-[#E8EFF0] flex items-center justify-center text-[#06373A] mb-3 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-1">Last Updated</span>
              <span className="text-[13px] font-semibold text-[#06373A]">
                {skinProfile.updated_at 
                  ? new Date(skinProfile.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                }
              </span>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
