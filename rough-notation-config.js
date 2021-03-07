(function () {
  const annotate = RoughNotation.annotate;
  const $ = (t) => document.querySelector(t);

  // export interface RoughAnnotationConfig {
  //   type: RoughAnnotationType;
  //   animate?: boolean; // defaults to true
  //   animationDuration?: number; // defaulst to 1000ms
  //   animationDelay?: number; // default = 0
  //   color?: string; // defaults to currentColor
  //   strokeWidth?: number; // default based on type
  //   padding?: number; // defaults to 5px
  // }

  {
    const a1 = annotate($('span.circle'), { type: 'circle', color: '#F44336'});
    const a2 = annotate($('span.box'), { type: 'box', color: '#F44336', padding: 3 });
    const a3 = annotate($('span.underline'), { type: 'underline', color: '#2196F3', padding: 3, strokeWidth: 3 });
    const a4 = annotate($('#highlight'), { type: 'highlight', color: '#FFF176', padding: 5, animationDuration: '3000' });
    
    // Without this annotations may be placed in a wrong position
    // https://github.com/rough-stuff/rough-notation/issues/18#issue-627803847
    document.fonts.ready.then(function () {
      // Those are animated only once after website is loaded. 
      // They are probably animated outside of view, so they may seem 'not animated'. 
      // If you want more interactive - take a look at code below with #highlight
      a1.show();
      a2.show();
      a3.show();
    })

    let callback =  (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          a4.show()
        }
        // Remove it if you don't want it to re-animate when back in view
        if (!entry.isIntersecting){
          a4.hide()
        }
        // End of remove
      });
    };
    let observer = new IntersectionObserver(callback, {threshold: 0.5});
    let target = document.querySelector('#highlight');
    observer.observe(target)
  }
})();