import React from "react";
import { Viewer } from '@react-pdf-viewer/core';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

const DocumentViewer = ({ url }: { url: string }) => {
    return (
        <Viewer
            fileUrl={url}
            plugins={[
                // Register plugins
                defaultLayoutPluginInstance,
            ]}
        />
    );
}

export default DocumentViewer;