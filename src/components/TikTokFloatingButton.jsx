import React from 'react';

const TikTokFloatingButton = () => {
    return (
        <a
            href="https://www.tiktok.com/@experiencianomada"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
                width: '60px',
                height: '60px',
                backgroundColor: '#000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            aria-label="Síguenos en TikTok"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
                stroke="none"
            >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.09-1.01.88-2.61.9-2.91 2.45v2.85c-.06 1.83-.56 3.73-1.66 5.25-1.92 2.37-5.02 3.65-8.03 2.87-1.43-.32-2.73-1.04-3.76-2.06-1.51-1.63-2.1-4-1.6-6.19.46-1.98 1.76-3.72 3.56-4.66 1.55-.83 3.39-.96 5.12-.49v4.5c-.83-.41-1.85-.46-2.71-.05-.82.35-1.41 1.14-1.46 2.05-.08 1.54 1.28 2.94 2.82 2.92 1.62.03 3.08-1.16 3.09-2.79V.02h3.42z" />
            </svg>
        </a>
    );
};

export default TikTokFloatingButton;
