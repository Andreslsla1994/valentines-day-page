import { useState } from 'react';
import Box from '@mui/material/Box';
import { Hearts } from 'react-loader-spinner';
import { Typography } from '@mui/material';

const ImageLoader = ({ src, alt }: { src: string, alt: string }) => {
    const [status, setStatus] = useState('loading'); // 'loading', 'loaded', 'failed'

    const handleLoad = () => setStatus('loaded');
    const handleError = () => setStatus('failed');

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {status === 'loading' && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant="h6">{"Espera un ratito XD"}</Typography>
                    <Hearts color="#ff80bf" height={200} width={200} />
                </Box>
            )}
            {/* The actual image element */}
            <Box
                component="img"
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                sx={{
                    display: 'block',
                    maxWidth: '100%',
                    width: 150,
                    height: 280,
                    objectFit: 'contain',
                    borderRadius: 2,
                    mt: 1,
                    mx: 'auto',
                }}
            />
        </Box>
    );
};

export default ImageLoader;
// Usage:
// <ImageLoader src="https://example.com/your-image.jpg" alt="Description" sx={{ width: 300, height: 200 }} />
