// =============================================================================
// ImageModal Component - Clickable images that open in a modal with zoom
// Uses native <dialog> element with inline script for client-side interactivity
// Works without React hydration (SSR-friendly)
// =============================================================================

import React from 'react';
import { HiXMark, HiArrowsPointingOut, HiMagnifyingGlassPlus, HiMagnifyingGlassMinus } from 'react-icons/hi2';

// Simple counter for unique IDs (works in SSR)
let idCounter = 0;
function generateId() {
  return `im${++idCounter}-${Math.random().toString(36).substring(2, 7)}`;
}

interface ImageModalProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  fullWidth?: boolean;
}

export function ImageModal({
  src,
  alt,
  caption,
  className = '',
  fullWidth = false,
}: ImageModalProps) {
  // Generate unique ID for this modal instance (SSR-safe)
  const uniqueId = generateId();
  const dialogId = `modal${uniqueId}`;
  const imgId = `img${uniqueId}`;
  const zoomId = `zoom${uniqueId}`;
  const openBtnId = `open${uniqueId}`;

  // Inline script for client-side interactivity
  const script = `
    (function() {
      var dialog = document.getElementById('${dialogId}');
      var img = document.getElementById('${imgId}');
      var zoomDisplay = document.getElementById('${zoomId}');
      var openBtn = document.getElementById('${openBtnId}');
      if (!dialog || !img || !openBtn) return;

      var zoom = 1;

      function updateZoom(newZoom) {
        zoom = Math.max(0.5, Math.min(3, newZoom));
        img.style.transform = 'scale(' + zoom + ')';
        img.style.transformOrigin = 'center center';
        if (zoomDisplay) zoomDisplay.textContent = Math.round(zoom * 100) + '%';
      }

      openBtn.addEventListener('click', function() {
        zoom = 1;
        updateZoom(1);
        dialog.showModal();
      });

      dialog.addEventListener('click', function(e) {
        if (e.target === dialog) dialog.close();
      });

      dialog.querySelectorAll('[data-zoom]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var action = btn.getAttribute('data-zoom');
          if (action === 'in') updateZoom(zoom + 0.5);
          if (action === 'out') updateZoom(zoom - 0.5);
        });
      });

      dialog.addEventListener('keydown', function(e) {
        if (e.key === '+' || e.key === '=') { e.preventDefault(); updateZoom(zoom + 0.5); }
        if (e.key === '-') { e.preventDefault(); updateZoom(zoom - 0.5); }
        if (e.key === '0') { e.preventDefault(); updateZoom(1); }
      });
    })();
  `;

  return (
    <>
      {/* Thumbnail */}
      <figure className={`my-6 not-prose ${className}`}>
        <button
          id={openBtnId}
          type="button"
          className="relative group cursor-zoom-in w-full rounded-lg overflow-hidden bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-0 p-0"
          aria-label={`Expandir imagem: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-base-100/90 rounded-full p-2 shadow-lg">
              <HiArrowsPointingOut className="w-5 h-5 text-base-content" />
            </div>
          </div>
        </button>
        {caption && (
          <figcaption className="text-center text-sm text-base-content/60 mt-3">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Modal using native dialog element */}
      <dialog
        id={dialogId}
        className="fixed inset-0 z-50 bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full backdrop:bg-black/90 backdrop:backdrop-blur-sm"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              type="button"
              data-zoom="out"
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
              aria-label="Diminuir zoom"
            >
              <HiMagnifyingGlassMinus className="w-5 h-5" />
            </button>
            <span id={zoomId} className="text-white text-sm font-mono min-w-[3rem] text-center">
              100%
            </span>
            <button
              type="button"
              data-zoom="in"
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
              aria-label="Aumentar zoom"
            >
              <HiMagnifyingGlassPlus className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <form method="dialog" className="m-0">
              <button
                type="submit"
                className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
                aria-label="Fechar"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Image container */}
          <div
            className={`relative overflow-auto max-h-[90vh] max-w-[90vw] flex items-center justify-center ${fullWidth ? 'w-full' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              id={imgId}
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 origin-center"
              draggable={false}
            />
          </div>

          {/* Caption in modal */}
          {caption && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <p className="text-white/80 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm max-w-lg text-center">
                {caption}
              </p>
            </div>
          )}

          {/* Keyboard hints */}
          <div className="absolute bottom-4 right-4 z-10 text-white/60 text-xs hidden md:flex gap-3">
            <span><kbd className="kbd kbd-xs bg-white/20 text-white border-white/30">Esc</kbd> fechar</span>
            <span><kbd className="kbd kbd-xs bg-white/20 text-white border-white/30">+</kbd>/<kbd className="kbd kbd-xs bg-white/20 text-white border-white/30">-</kbd> zoom</span>
          </div>
        </div>
      </dialog>

      {/* Inline script for interactivity - runs after DOM is ready */}
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}

// Gallery component for multiple images
interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  title?: string;
}

export function ImageGallery({ images, columns = 3, title }: ImageGalleryProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="my-8 not-prose">
      {title && (
        <h3 className="text-lg font-semibold text-base-content mb-4">{title}</h3>
      )}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <ImageModal
            key={index}
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            className="my-0"
          />
        ))}
      </div>
    </div>
  );
}

// MDX Image override - replaces default <img> tags in markdown
interface MDXImageProps {
  src?: string;
  alt?: string;
  title?: string;
  className?: string;
}

export function MDXImage({ src, alt, title, className }: MDXImageProps) {
  if (!src) return null;

  return (
    <ImageModal
      src={src}
      alt={alt || ''}
      caption={title}
      className={className}
    />
  );
}

export default ImageModal;
