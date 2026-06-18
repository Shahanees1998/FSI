"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { validateClientProfileInput } from "@/lib/clientProfileValidation";
import { US_STATE_OPTIONS } from "@/lib/usStates";
import { useToast } from "@/store/toast.context";

const PHONE_TYPES = [
  { label: "Cell", value: "cell" },
  { label: "Home", value: "home" },
  { label: "Work", value: "work" },
];

const COUNTRIES = [{ label: "USA", value: "USA" }];

const US_STATES = [{ label: "Select State", value: "" }, ...US_STATE_OPTIONS];

const CLIENT_FORM_CANCEL_CLASS =
  "p-button p-component p-button-sm p-button-outlined p-button-secondary client-profile-btn no-underline";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <small className="p-error block mt-1">{message}</small>;
}

function fieldClass(hasError: boolean, extra?: string) {
  return classNames(extra ?? "w-full", { "p-invalid": hasError });
}

export type ClientProfileChildForm = {
  key: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredFirstName: string;
  sex: string | null;
  birthDate: Date | null;
};

export type ClientProfileFormInitial = {
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  preferredFirstName?: string;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
  zipCode?: string | null;
  email?: string | null;
  phone?: string | null;
  phoneType?: string | null;
  sex?: string | null;
  birthDate?: string | null;
  profileImageUrl?: string | null;
  profileImagePublicId?: string | null;
  spouseFirstName?: string | null;
  spouseMiddleName?: string | null;
  spouseLastName?: string | null;
  spousePreferredFirstName?: string | null;
  spouseSex?: string | null;
  spouseBirthDate?: string | null;
  notes?: string | null;
  children?: {
    firstName: string;
    middleName?: string | null;
    lastName: string;
    preferredFirstName: string;
    sex?: string | null;
    birthDate?: string | null;
  }[];
};

function IconInput({
  icon,
  children,
  className,
}: {
  icon: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={classNames("p-input-icon-left w-full", className)}>
      <i className={classNames("pi", icon)} />
      {children}
    </span>
  );
}

function ageFromBirthDate(birthDate: Date | null): string {
  if (!birthDate) return "";
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age >= 0 ? String(age) : "";
}

function parseIsoDate(s: string | null | undefined): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function PersonBlock({
  formId,
  title,
  showRemove,
  onRemove,
  firstName,
  middleName,
  lastName,
  preferredFirstName,
  sex,
  birthDate,
  fieldPrefix,
  errors,
  onField,
}: {
  formId: string;
  title: string;
  showRemove?: boolean;
  onRemove?: () => void;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredFirstName: string;
  sex: string | null;
  birthDate: Date | null;
  fieldPrefix: string;
  errors: Record<string, string>;
  onField: (patch: Record<string, string | Date | null>) => void;
}) {
  const ageDisplay = useMemo(() => ageFromBirthDate(birthDate), [birthDate]);
  const err = (field: string) => errors[`${fieldPrefix}${field}`];

  return (
    <div className="surface-card border-round border-1 surface-border p-4 mb-3 relative">
      <div className="flex justify-content-between align-items-center mb-3">
        <span className="font-semibold text-900">{title}</span>
        {showRemove && (
          <button
            type="button"
            className="p-button p-button-text p-button-danger p-0"
            onClick={onRemove}
            aria-label="Remove"
          >
            <i className="pi pi-times text-xl" />
          </button>
        )}
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <div className="field grid align-items-center mb-2">
            <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="col">
              <IconInput icon="pi-user">
                <InputText
                  className={fieldClass(Boolean(err("firstName")))}
                  placeholder="Please enter first name"
                  value={firstName}
                  onChange={(e) => onField({ firstName: e.target.value })}
                />
              </IconInput>
              <FieldError message={err("firstName")} />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="field grid align-items-center mb-2">
            <label className="col-fixed w-12rem md:w-14rem text-right pr-2">Middle Name</label>
            <div className="col">
              <IconInput icon="pi-user">
                <InputText
                  className={fieldClass(Boolean(err("middleName")))}
                  placeholder="Please enter middle name"
                  value={middleName}
                  onChange={(e) => onField({ middleName: e.target.value })}
                />
              </IconInput>
              <FieldError message={err("middleName")} />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="field grid align-items-center mb-2">
            <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="col">
              <IconInput icon="pi-user">
                <InputText
                  className={fieldClass(Boolean(err("lastName")))}
                  placeholder="Please enter last name"
                  value={lastName}
                  onChange={(e) => onField({ lastName: e.target.value })}
                />
              </IconInput>
              <FieldError message={err("lastName")} />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="field grid align-items-center mb-2">
            <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
              Preferred First Name <span className="text-red-500">*</span>
            </label>
            <div className="col">
              <IconInput icon="pi-gift">
                <InputText
                  className={fieldClass(Boolean(err("preferredFirstName")))}
                  placeholder="Please enter first name"
                  value={preferredFirstName}
                  onChange={(e) => onField({ preferredFirstName: e.target.value })}
                />
              </IconInput>
              <FieldError message={err("preferredFirstName")} />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="field grid align-items-center mb-2">
            <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
              Sex <span className="text-red-500">*</span>
            </label>
            <div className="col flex align-items-center gap-4">
              <div className="flex align-items-center gap-2">
                <input
                  id={`${formId}-male`}
                  name={`sex-${formId}`}
                  type="radio"
                  value="male"
                  checked={sex === "male"}
                  onChange={() => onField({ sex: "male" })}
                />
                <label htmlFor={`${formId}-male`}>Male</label>
              </div>
              <div className="flex align-items-center gap-2">
                <input
                  id={`${formId}-female`}
                  name={`sex-${formId}`}
                  type="radio"
                  value="female"
                  checked={sex === "female"}
                  onChange={() => onField({ sex: "female" })}
                />
                <label htmlFor={`${formId}-female`}>Female</label>
              </div>
            </div>
            <FieldError message={err("sex")} />
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="field grid align-items-center mb-2">
            <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
              Birth Date <span className="text-red-500">*</span>
            </label>
            <div className="col flex align-items-center gap-2 flex-wrap">
              <Calendar
                value={birthDate}
                onChange={(e) => onField({ birthDate: (e.value as Date | null) ?? null })}
                showIcon
                dateFormat="mm/dd/yy"
                className={classNames("flex-grow-1", { "p-invalid": Boolean(err("birthDate")) })}
                inputClassName="w-full"
                placeholder="mm/dd/yyyy"
              />
              <span className="p-input-icon-right">
                <InputText
                  value={ageDisplay}
                  readOnly
                  placeholder="Age"
                  className="w-6rem surface-100"
                  style={{ opacity: 0.9 }}
                />
                <i className="pi pi-question-circle text-500" title="Age from birth date" />
              </span>
            </div>
            <FieldError message={err("birthDate")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientProfileAvatar({
  imageUrl,
  uploading,
  disabled,
  onPickFile,
}: {
  imageUrl: string;
  uploading: boolean;
  disabled: boolean;
  onPickFile: () => void;
}) {
  return (
    <button
      type="button"
      className="client-profile-avatar border-none p-0 cursor-pointer"
      onClick={onPickFile}
      disabled={disabled || uploading}
      aria-label={imageUrl ? "Edit client photo" : "Add client photo"}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className="client-profile-avatar-image" />
      ) : (
        <span className="client-profile-avatar-placeholder flex flex-column align-items-center justify-content-center gap-2">
          <i className="pi pi-user text-4xl text-500" />
          <span className="text-sm text-600">Add photo</span>
        </span>
      )}
      <span className="client-profile-avatar-overlay">
        {uploading ? (
          <i className="pi pi-spin pi-spinner text-white text-2xl" />
        ) : (
          <>
            <i className="pi pi-pencil text-white text-lg" />
            <span className="text-white text-sm font-medium">Edit</span>
          </>
        )}
      </span>
    </button>
  );
}

function ClientTextField({
  label,
  required,
  error,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field mb-3">
      <label className="block mb-1">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <IconInput icon={icon}>{children}</IconInput>
      <FieldError message={error} />
    </div>
  );
}

function buildPayload(
  client: {
    firstName: string;
    middleName: string;
    lastName: string;
    preferredFirstName: string;
    city: string;
    state: string;
    country: string;
    address: string;
    zipCode: string;
    email: string;
    phone: string;
    phoneType: string;
    sex: string | null;
    birthDate: Date | null;
    profileImageUrl: string;
    profileImagePublicId: string;
    notes: string;
  },
  spouse: {
    firstName: string;
    middleName: string;
    lastName: string;
    preferredFirstName: string;
    sex: string | null;
    birthDate: Date | null;
  },
  showSpouse: boolean,
  children: ClientProfileChildForm[]
) {
  const iso = (d: Date | null) => (d ? d.toISOString() : null);

  return {
    firstName: client.firstName,
    middleName: client.middleName || null,
    lastName: client.lastName,
    preferredFirstName: client.preferredFirstName,
    city: client.city || null,
    state: client.state || null,
    country: client.country || "USA",
    address: client.address || null,
    zipCode: client.zipCode || null,
    email: client.email || null,
    phone: client.phone || null,
    phoneType: client.phoneType || null,
    sex: client.sex,
    birthDate: iso(client.birthDate),
    profileImageUrl: client.profileImageUrl || null,
    profileImagePublicId: client.profileImagePublicId || null,
    spouseFirstName: showSpouse ? spouse.firstName || null : null,
    spouseMiddleName: showSpouse ? spouse.middleName || null : null,
    spouseLastName: showSpouse ? spouse.lastName || null : null,
    spousePreferredFirstName: showSpouse ? spouse.preferredFirstName || null : null,
    spouseSex: showSpouse ? spouse.sex : null,
    spouseBirthDate: showSpouse ? iso(spouse.birthDate) : null,
    children: children.map(({ key: _k, ...c }) => ({
      firstName: c.firstName,
      middleName: c.middleName || null,
      lastName: c.lastName,
      preferredFirstName: c.preferredFirstName,
      sex: c.sex,
      birthDate: iso(c.birthDate),
    })),
    notes: client.notes || null,
  };
}

type Props = {
  mode: "create" | "edit";
  profileId?: string;
  initial?: ClientProfileFormInitial;
};

export default function ClientProfileForm({ mode, profileId, initial }: Props) {
  const baseId = useId();
  const router = useRouter();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [middleName, setMiddleName] = useState(initial?.middleName ?? "");
  const [lastName, setLastName] = useState(initial?.lastName ?? "");
  const [preferredFirstName, setPreferredFirstName] = useState(initial?.preferredFirstName ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [state, setState] = useState(initial?.state ?? "");
  const [country, setCountry] = useState(initial?.country ?? "USA");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [zipCode, setZipCode] = useState(initial?.zipCode ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [phoneType, setPhoneType] = useState(initial?.phoneType ?? "cell");
  const [clientSex, setClientSex] = useState<string | null>(initial?.sex ?? null);
  const [birthDate, setBirthDate] = useState<Date | null>(() => parseIsoDate(initial?.birthDate ?? undefined));
  const [profileImageUrl, setProfileImageUrl] = useState(initial?.profileImageUrl ?? "");
  const [profileImagePublicId, setProfileImagePublicId] = useState(initial?.profileImagePublicId ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const hasSpouseData = Boolean(
    initial?.spouseFirstName ||
      initial?.spouseLastName ||
      initial?.spousePreferredFirstName ||
      initial?.spouseBirthDate ||
      initial?.spouseSex
  );
  const [showSpouse, setShowSpouse] = useState(hasSpouseData);
  const [spouse, setSpouse] = useState({
    firstName: initial?.spouseFirstName ?? "",
    middleName: initial?.spouseMiddleName ?? "",
    lastName: initial?.spouseLastName ?? "",
    preferredFirstName: initial?.spousePreferredFirstName ?? "",
    sex: (initial?.spouseSex ?? null) as string | null,
    birthDate: parseIsoDate(initial?.spouseBirthDate ?? undefined),
  });

  const [children, setChildren] = useState<ClientProfileChildForm[]>(() => {
    const list = initial?.children ?? [];
    return list.map((c, i) => ({
      key: `c-${i}-${c.firstName}`,
      firstName: c.firstName,
      middleName: c.middleName ?? "",
      lastName: c.lastName,
      preferredFirstName: c.preferredFirstName,
      sex: (c.sex ?? null) as string | null,
      birthDate: parseIsoDate(c.birthDate ?? undefined),
    }));
  });

  const [nextChildKey, setNextChildKey] = useState(1);
  const addChild = useCallback(() => {
    setChildren((prev) => [
      ...prev,
      {
        key: `new-${nextChildKey}`,
        firstName: "",
        middleName: "",
        lastName: "",
        preferredFirstName: "",
        sex: null,
        birthDate: null,
      },
    ]);
    setNextChildKey((n) => n + 1);
  }, [nextChildKey]);

  const removeChild = useCallback((key: string) => {
    setChildren((prev) => prev.filter((c) => c.key !== key));
  }, []);

  const updateChild = useCallback((key: string, patch: Partial<ClientProfileChildForm>) => {
    setChildren((prev) => prev.map((c) => (c.key === key ? { ...c, ...patch } : c)));
  }, []);

  const clientAge = useMemo(() => ageFromBirthDate(birthDate), [birthDate]);

  const clearError = useCallback((key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const uploadClientImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/agent/client-profiles/image", {
        method: "POST",
        credentials: "include",
        body,
      });
      const payload = await response.json();

      if (!response.ok) {
        showToast("error", payload.error || "Unable to upload client image.");
        return;
      }

      if (profileImagePublicId && profileImagePublicId !== payload.key) {
        await fetch("/api/agent/client-profiles/image", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: profileImagePublicId }),
        }).catch(() => undefined);
      }

      setProfileImageUrl(payload.url ?? "");
      setProfileImagePublicId(payload.key ?? "");
      showToast("success", "Client photo uploaded.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void uploadClientImage(file);
    }
  };

  const save = async () => {
    const validation = validateClientProfileInput({
      firstName,
      middleName,
      lastName,
      preferredFirstName,
      sex: clientSex,
      birthDate,
      email,
      phone,
      phoneType,
      city,
      state,
      country,
      address,
      zipCode,
      showSpouse,
      spouse,
      children: children.map((c) => ({ ...c, key: c.key })),
    });

    if (validation.firstError) {
      setErrors(validation.errors);
      showToast("warn", "Check required fields", validation.firstError);
      return;
    }

    setErrors({});

    const payload = buildPayload(
      {
        firstName,
        middleName,
        lastName,
        preferredFirstName,
        city,
        state,
        country,
        address,
        zipCode,
        email,
        phone,
        phoneType,
        sex: clientSex,
        birthDate,
        profileImageUrl,
        profileImagePublicId,
        notes,
      },
      spouse,
      showSpouse,
      children
    );

    setSaving(true);
    const url =
      mode === "create" ? "/api/agent/client-profiles" : `/api/agent/client-profiles/${profileId}`;
    const res = await fetch(url, {
      method: mode === "create" ? "POST" : "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      showToast("error", data.error || "Save failed.");
      return;
    }
    showToast("success", mode === "create" ? "Client profile created." : "Client profile saved.");
    router.push("/agent/clients");
    router.refresh();
  };

  return (
    <div className="client-profile-form">
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 mb-4">
        <h1 className="text-2xl font-semibold m-0 text-900">Personal Information</h1>
        <div className="flex gap-2 flex-wrap">
          <Link href="/agent/clients" className={CLIENT_FORM_CANCEL_CLASS}>
            <span className="p-button-label">Cancel</span>
          </Link>
          <Button
            label="Save"
            type="button"
            size="small"
            severity="success"
            className="client-profile-btn"
            onClick={save}
            loading={saving}
            disabled={saving || uploadingImage}
          />
        </div>
      </div>

      <div className="surface-card border-round border-1 surface-border p-4 mb-3">
        <div className="font-semibold text-900 mb-3">Client:</div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleImageSelect}
        />

        <div className="client-profile-client-top">
          <div className="client-profile-image-col">
            <ClientProfileAvatar
              imageUrl={profileImageUrl}
              uploading={uploadingImage}
              disabled={saving}
              onPickFile={() => fileInputRef.current?.click()}
            />
          </div>

          <div className="client-profile-fields-beside grid">
            <div className="col-12 md:col-6">
              <ClientTextField label="First Name" required error={errors.firstName} icon="pi-user">
                <InputText
                  className={fieldClass(Boolean(errors.firstName))}
                  placeholder="Please enter first name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    clearError("firstName");
                  }}
                />
              </ClientTextField>
            </div>
            <div className="col-12 md:col-6">
              <ClientTextField label="Middle Name" error={errors.middleName} icon="pi-user">
                <InputText
                  className={fieldClass(Boolean(errors.middleName))}
                  placeholder="Please enter middle name"
                  value={middleName}
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                    clearError("middleName");
                  }}
                />
              </ClientTextField>
            </div>
            <div className="col-12 md:col-6">
              <ClientTextField label="Last Name" required error={errors.lastName} icon="pi-user">
                <InputText
                  className={fieldClass(Boolean(errors.lastName))}
                  placeholder="Please enter last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    clearError("lastName");
                  }}
                />
              </ClientTextField>
            </div>
            <div className="col-12 md:col-6">
              <ClientTextField label="Preferred First Name" required error={errors.preferredFirstName} icon="pi-gift">
                <InputText
                  className={fieldClass(Boolean(errors.preferredFirstName))}
                  placeholder="Please enter first name"
                  value={preferredFirstName}
                  onChange={(e) => {
                    setPreferredFirstName(e.target.value);
                    clearError("preferredFirstName");
                  }}
                />
              </ClientTextField>
            </div>
            <div className="col-12 md:col-6">
              <div className="field mb-3">
                <label className="block mb-1">
                  Sex <span className="text-red-500">*</span>
                </label>
                <div className="flex align-items-center gap-4">
                  <div className="flex align-items-center gap-2">
                    <input
                      id={`${baseId}-client-male`}
                      name="client-sex"
                      type="radio"
                      value="male"
                      checked={clientSex === "male"}
                      onChange={(e) => {
                        setClientSex(e.target.value);
                        clearError("sex");
                      }}
                    />
                    <label htmlFor={`${baseId}-client-male`}>Male</label>
                  </div>
                  <div className="flex align-items-center gap-2">
                    <input
                      id={`${baseId}-client-female`}
                      name="client-sex"
                      type="radio"
                      value="female"
                      checked={clientSex === "female"}
                      onChange={(e) => {
                        setClientSex(e.target.value);
                        clearError("sex");
                      }}
                    />
                    <label htmlFor={`${baseId}-client-female`}>Female</label>
                  </div>
                </div>
                <FieldError message={errors.sex} />
              </div>
            </div>
            <div className="col-12 md:col-6">
              <div className="field mb-3">
                <label className="block mb-1">
                  Birth Date <span className="text-red-500">*</span>
                </label>
                <div className="flex align-items-center gap-2 flex-wrap">
                  <Calendar
                    value={birthDate}
                    onChange={(e) => {
                      setBirthDate((e.value as Date | null) ?? null);
                      clearError("birthDate");
                    }}
                    showIcon
                    dateFormat="mm/dd/yy"
                    className={classNames("flex-grow-1", { "p-invalid": Boolean(errors.birthDate) })}
                    inputClassName="w-full"
                  />
                  <span className="p-input-icon-right">
                    <InputText value={clientAge} readOnly placeholder="Age" className="w-6rem surface-100" />
                    <i className="pi pi-question-circle text-500" />
                  </span>
                </div>
                <FieldError message={errors.birthDate} />
              </div>
            </div>
          </div>
        </div>

        <div className="client-profile-fields-full grid">
          <div className="col-12 md:col-4">
            <ClientTextField label="City" error={errors.city} icon="pi-building">
              <InputText
                className={fieldClass(Boolean(errors.city))}
                placeholder="Please enter city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  clearError("city");
                }}
              />
            </ClientTextField>
          </div>
          <div className="col-12 md:col-4">
            <div className="field mb-3">
              <label className="block mb-1">State</label>
              <Dropdown
                value={state}
                options={US_STATES}
                onChange={(e) => {
                  setState(e.value);
                  clearError("state");
                }}
                className={classNames("w-full", { "p-invalid": Boolean(errors.state) })}
                optionLabel="label"
                optionValue="value"
                placeholder="Select State"
              />
              <FieldError message={errors.state} />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <ClientTextField label="Email" error={errors.email} icon="pi-envelope">
              <InputText
                className={fieldClass(Boolean(errors.email))}
                type="email"
                placeholder="Please enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
              />
            </ClientTextField>
          </div>
          <div className="col-12 md:col-4">
            <div className="field mb-3">
              <label className="block mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex align-items-stretch gap-2">
                <Dropdown
                  value={phoneType}
                  options={PHONE_TYPES}
                  onChange={(e) => {
                    setPhoneType(e.value);
                    clearError("phoneType");
                  }}
                  className={classNames("w-8rem", { "p-invalid": Boolean(errors.phoneType) })}
                  optionLabel="label"
                  optionValue="value"
                />
                <IconInput icon="pi-phone" className="flex-grow-1">
                  <InputText
                    className={fieldClass(Boolean(errors.phone))}
                    placeholder="Please enter phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearError("phone");
                    }}
                  />
                </IconInput>
              </div>
              <FieldError message={errors.phoneType || errors.phone} />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <ClientTextField label="Address" error={errors.address} icon="pi-home">
              <InputText
                className={fieldClass(Boolean(errors.address))}
                placeholder="Please enter address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  clearError("address");
                }}
              />
            </ClientTextField>
          </div>
          <div className="col-12 md:col-4">
            <div className="field mb-3">
              <label className="block mb-1">Country</label>
              <Dropdown
                value={country}
                options={COUNTRIES}
                onChange={(e) => setCountry(e.value)}
                className="w-full"
                optionLabel="label"
                optionValue="value"
              />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <ClientTextField label="Zip Code" error={errors.zipCode} icon="pi-globe">
              <InputText
                className={fieldClass(Boolean(errors.zipCode))}
                placeholder="Please enter postal code / zip code"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                  clearError("zipCode");
                }}
              />
            </ClientTextField>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          label="Add child"
          type="button"
          size="small"
          outlined
          severity="success"
          icon="pi pi-plus"
          className="client-profile-btn"
          onClick={addChild}
        />
        {!showSpouse ? (
          <Button
            label="Add spouse"
            type="button"
            size="small"
            outlined
            severity="success"
            icon="pi pi-plus"
            className="client-profile-btn"
            onClick={() => setShowSpouse(true)}
          />
        ) : null}
      </div>

      {showSpouse && (
        <PersonBlock
          formId="spouse"
          title="Spouse:"
          showRemove
          fieldPrefix="spouse."
          errors={errors}
          onRemove={() => {
            setShowSpouse(false);
            setSpouse({
              firstName: "",
              middleName: "",
              lastName: "",
              preferredFirstName: "",
              sex: null,
              birthDate: null,
            });
            setErrors((prev) => {
              const next = { ...prev };
              for (const key of Object.keys(next)) {
                if (key.startsWith("spouse.")) delete next[key];
              }
              return next;
            });
          }}
          firstName={spouse.firstName}
          middleName={spouse.middleName}
          lastName={spouse.lastName}
          preferredFirstName={spouse.preferredFirstName}
          sex={spouse.sex}
          birthDate={spouse.birthDate}
          onField={(patch) => {
            setSpouse((s) => ({ ...s, ...patch }));
            for (const key of Object.keys(patch)) {
              clearError(`spouse.${key}`);
            }
          }}
        />
      )}

      {children.map((c, index) => (
        <PersonBlock
          key={c.key}
          formId={`child-${c.key}`}
          title={`Child ${index + 1}:`}
          showRemove
          fieldPrefix={`child.${c.key}.`}
          errors={errors}
          onRemove={() => {
            removeChild(c.key);
            setErrors((prev) => {
              const next = { ...prev };
              for (const key of Object.keys(next)) {
                if (key.startsWith(`child.${c.key}.`)) delete next[key];
              }
              return next;
            });
          }}
          firstName={c.firstName}
          middleName={c.middleName}
          lastName={c.lastName}
          preferredFirstName={c.preferredFirstName}
          sex={c.sex}
          birthDate={c.birthDate}
          onField={(patch) => {
            updateChild(c.key, patch);
            for (const key of Object.keys(patch)) {
              clearError(`child.${c.key}.${key}`);
            }
          }}
        />
      ))}

      <div className="surface-card border-round border-1 surface-border p-4 mb-3">
        <div className="text-xl font-semibold text-900 mb-3">Notes</div>
        <InputTextarea className="w-full" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal notes about this client" />
      </div>

      <div className="flex justify-content-end gap-2 mt-4 pt-3 border-top-1 surface-border">
        <Link href="/agent/clients" className={CLIENT_FORM_CANCEL_CLASS}>
          <span className="p-button-label">Cancel</span>
        </Link>
        <Button
          label="Save"
          type="button"
          size="small"
          severity="success"
          className="client-profile-btn"
          onClick={save}
          loading={saving}
          disabled={saving || uploadingImage}
        />
      </div>
    </div>
  );
}
