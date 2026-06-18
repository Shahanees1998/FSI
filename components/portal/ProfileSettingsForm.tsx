"use client";

import { useRef, useState } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/store/toast.context";

interface ProfileSettingsFormProps {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string | null;
        jobTitle?: string | null;
        location?: string | null;
        profileImage?: string | null;
        profileImagePublicId?: string | null;
    };
}

export default function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
    const { refreshUser } = useAuth();
    const { showToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone ?? "",
        jobTitle: user.jobTitle ?? "",
        location: user.location ?? "",
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [profileImage, setProfileImage] = useState(user.profileImage ?? "");
    const [uploadingImage, setUploadingImage] = useState(false);

    const initials = `${form.firstName?.[0] ?? "U"}${form.lastName?.[0] ?? "S"}`;

    const uploadProfileImage = async (file: File) => {
        setUploadingImage(true);

        try {
            const body = new FormData();
            body.append("file", file);

            const response = await fetch("/api/users/profile-image", {
                method: "POST",
                credentials: "include",
                body,
            });
            const payload = await response.json();

            if (!response.ok) {
                showToast("error", payload.error || "Unable to upload profile image.");
                return;
            }

            setProfileImage(payload.user.profileImage ?? "");
            await refreshUser();
            showToast("success", "Profile photo updated successfully.");
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const removeProfileImage = async () => {
        setUploadingImage(true);

        try {
            const response = await fetch("/api/users/profile-image", {
                method: "DELETE",
                credentials: "include",
            });
            const payload = await response.json();

            if (!response.ok) {
                showToast("error", payload.error || "Unable to remove profile image.");
                return;
            }

            setProfileImage("");
            await refreshUser();
            showToast("success", "Profile photo removed.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            void uploadProfileImage(file);
        }
    };

    const updateProfile = async () => {
        const response = await fetch("/api/users/edit-profile", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const payload = await response.json();
        if (!response.ok) {
            showToast("error", payload.error || "Unable to save profile.");
            return;
        }
        showToast("success", "Profile updated successfully.");
    };

    const updatePassword = async () => {
        const response = await fetch("/api/users/change-password", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(passwordForm),
        });
        const payload = await response.json();
        if (!response.ok) {
            showToast("error", payload.error || "Unable to change password.");
            return;
        }
        setPasswordForm({ currentPassword: "", newPassword: "" });
        showToast("success", "Password changed successfully.");
    };

    return (
        <div className="grid align-items-stretch">
            <div className="col-12">
                <div className="surface-card border-round border-1 surface-border p-4 mb-0">
                    <h3 className="mt-0">Profile photo</h3>
                    <div className="flex flex-column md:flex-row align-items-start md:align-items-center gap-4">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt=""
                                className="border-circle"
                                style={{ width: "6rem", height: "6rem", objectFit: "cover" }}
                            />
                        ) : (
                            <Avatar label={initials} size="xlarge" shape="circle" className="bg-primary" />
                        )}
                        <div className="flex flex-column gap-2">
                            <span className="text-600 text-sm">
                                Upload a JPEG, PNG, GIF, or WebP image up to 5MB.
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />
                                <Button
                                    label={uploadingImage ? "Uploading..." : "Upload photo"}
                                    icon="pi pi-upload"
                                    disabled={uploadingImage}
                                    onClick={() => fileInputRef.current?.click()}
                                />
                                {profileImage && (
                                    <Button
                                        label="Remove photo"
                                        icon="pi pi-trash"
                                        outlined
                                        severity="secondary"
                                        disabled={uploadingImage}
                                        onClick={removeProfileImage}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-7 flex">
                <div className="surface-card border-round border-1 surface-border p-4 flex flex-column flex-grow-1 w-full">
                    <h3 className="mt-0">Profile details</h3>
                    <div className="grid flex-grow-1">
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">First name</label>
                            <InputText
                                className="w-full"
                                value={form.firstName}
                                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Last name</label>
                            <InputText
                                className="w-full"
                                value={form.lastName}
                                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Email</label>
                            <InputText className="w-full" value={user.email} disabled />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Phone</label>
                            <InputText
                                className="w-full"
                                value={form.phone}
                                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Job title</label>
                            <InputText
                                className="w-full"
                                value={form.jobTitle}
                                onChange={(e) => setForm((prev) => ({ ...prev, jobTitle: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Location</label>
                            <InputText
                                className="w-full"
                                value={form.location}
                                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="mt-auto pt-3">
                        <Button label="Save profile" onClick={updateProfile} />
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-5 flex">
                <div className="surface-card border-round border-1 surface-border p-4 flex flex-column flex-grow-1 w-full">
                    <h3 className="mt-0">Change password</h3>
                    <div className="flex-grow-1 flex flex-column">
                        <label className="block mb-2">Current password</label>
                        <Password
                            feedback={false}
                            toggleMask
                            className="w-full mb-3"
                            inputClassName="w-full"
                            value={passwordForm.currentPassword}
                            onChange={(e) =>
                                setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                            }
                        />
                        <label className="block mb-2">New password</label>
                        <Password
                            feedback={false}
                            toggleMask
                            className="w-full mb-3"
                            inputClassName="w-full"
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                                setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                            }
                        />
                    </div>
                    <div className="mt-auto pt-3">
                        <Button label="Update password" outlined onClick={updatePassword} />
                    </div>
                </div>
            </div>
        </div>
    );
}
