import { useEffect, useRef, useState } from 'react';
import { apiFetch, apiUpload } from '../services/api';
import type { User } from '../types/user';



export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    apiFetch<User>('/user/me')
      .then(setUser)
      .catch(() => setError('Failed to load profile'));
  }, []);

  const handleUploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);
    setError(null);

    try {
      const updatedUser = await apiUpload<User>(
        '/user/me/avatar',
        formData
      );
      setUser(updatedUser);
    } catch {
      setError('Avatar upload failed');
    } finally {
      setLoading(false);
    }
  };

  const onSelectAvatar = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Max file size is 2MB');
      return;
    }

    setError(null);

    // 👁️ превʼю
    const url = URL.createObjectURL(file);
    setPreview(url);

    // ⬆️ upload
    handleUploadAvatar(file);
  };

  const handleDeleteAvatar = async () => {
    setLoading(true);
    try {
      const updatedUser = await apiFetch<User>(
        '/user/me/avatar',
        { method: 'DELETE' }
      );
      setUser(updatedUser);
      setPreview(null);
    } catch {
      setError('Failed to delete avatar');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  const avatarSrc =
    preview
      ? preview
      : user.avatarUrl
        ? `http://localhost:3000${user.avatarUrl}`
        : '/default-avatar.png';

  return (
    <div style={{
      maxWidth: 520,
      margin: '40px auto',
      padding: 24,
      borderRadius: 12,
      background: '#fff',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    }}>
      <h2 style={{ textAlign: 'center' }}>Profile</h2>

     <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: 32,
  }}
>
  <div
    style={{
      display: 'flex',
      gap: 40,
      alignItems: 'center',
      width: 420, // центр відносно Profile
    }}
  >
    {/* LEFT */}
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={avatarSrc}
        alt="avatar"
        width={140}
        height={140}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: 12,
        }}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        style={buttonStyle}
      >
        Обрати фото
      </button>

      {user.avatarUrl && (
        <button
          onClick={handleDeleteAvatar}
          disabled={loading}
          style={{ ...buttonStyle, background: '#f5f5f5' }}
        >
          Видалити
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelectAvatar(file);
        }}
      />
    </div>

    {/* RIGHT */}
    <div
      style={{
        background: '#f9fafb',
        padding: '16px 20px',
        borderRadius: 10,
        minWidth: 220,
      }}
    >
      <InfoRow label="Імʼя" value={user.username} />
      <InfoRow label="Email" value={user.email} />

      <p
        style={{
          marginTop: 12,
          fontSize: 13,
          color: '#777',
        }}
      >
        Тут буде додаткова інформація профілю або налаштування
      </p>
    </div>
  </div>
</div>

      {loading && <p style={{ marginTop: 16 }}>Uploading...</p>}
      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  display: 'block',
  width: 140,
  padding: '8px 12px',
  marginBottom: 8,
  borderRadius: 8,
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
};
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ color: '#666', fontSize: 13 }}>
        {label}:
      </span>
      <div style={{ fontWeight: 600 }}>
        {value}
      </div>
    </div>
  );
}

