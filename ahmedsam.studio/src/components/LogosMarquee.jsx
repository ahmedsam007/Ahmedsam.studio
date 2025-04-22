import React from 'react';

const logos = [
  'figma.svg',
  'sketch.svg',
  'slack.svg',
  'adobe.svg',
  'framer.svg',
  'jira.svg',
  'miro.svg',
  'freepik-dark.svg',
  'freepik-light.svg',
];

function LogosMarquee() {
  return (
    <div className="mt-32">
      <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden before:content-[''] before:absolute before:inset-0 before:w-full before:bg-[linear-gradient(to_right,hsl(var(--background-default))_0%,transparent_30%,transparent_70%,hsl(var(--background-default))_100%)] before:z-10 flex flex-nowrap px-5 lg:px-12 justify-center gap-4 lg:gap-8" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)' }}>
          {[0, 1].map((track) => (
            <div key={track} className="gap-4 lg:gap-8 flex flex-nowrap items-center w-fit animate-[marquee_90000ms_linear_both_infinite] will-change-transform motion-reduce:animate-none">
              {logos.map((file) => (
                <div key={`${track}-${file}`} className="flex items-center justify-center h-5 lg:h-5 w-max !inline-block">
                  <img
                    src={`/images/logos/${file}`}
                    alt={file.replace(/\.[^/.]+$/, '')}
                    className="h-5 lg:h-5 !min-h-5 lg:!min-h-5 w-auto block dark:hidden"
                    draggable="false"
                  />
                  <img
                    src={`/images/logos/${file}`}
                    alt={file.replace(/\.[^/.]+$/, '')}
                    className="h-5 lg:h-5 !min-h-5 lg:!min-h-5 w-auto block hidden dark:block"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogosMarquee; 