import bannerImg from '../assets/banner_mision_del_sol.png';

const AdBanner = ({ className = '', style = {}, minimal = false, imageSrc, linkUrl }) => {
    // Default to the Congress banner if no props provided (for backward compatibility)
    const finalImage = imageSrc || bannerImg;
    const finalLink = linkUrl || "https://www.misiondelsol.com/es/";
    const altText = linkUrl ? "Advertisement" : "Hotel Misión del Sol";

    return (
        <section
            className={`ad-banner-section ${className}`}
            style={{
                width: '100%',
                backgroundColor: minimal ? 'transparent' : '#ffffff',
                padding: minimal ? '0' : '20px 0',
                ...style
            }}
        >
            <div className={minimal ? "" : "container"} style={minimal ? {} : { margin: '0 auto' }}>
                <a
                    href={finalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ad-banner-link"
                    style={{
                        display: 'block',
                        width: '100%',
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    <img
                        src={finalImage}
                        alt={altText}
                        className="ad-banner-img"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto',
                            objectFit: 'cover',
                            borderRadius: '4px'
                        }}
                    />
                </a>
            </div>
        </section>
    );
};

export default AdBanner;
