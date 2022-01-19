var isScrolling = false;
        window.onscroll = function() {
            if(isScrolling) return;
            var elements = [
                {
                    div: document.getElementById('platform'),
                    link: document.getElementById('platformLink'),
                },
                {
                    div: document.getElementById('protsess'),
                    link: document.getElementById('protsessLink'),
                },
                {
                    div: document.getElementById('kontakt'),
                    link: document.getElementById('kontaktLink'),
                }
            ];

            elements.forEach(element => {
                if(elementInViewport(element.div)) {
                    addActiveClass(element.link)
                }
            });
        };

        function addActiveClass(element) {
            var a = document.getElementsByClassName('Nav__Link');
            for (i = 0; i < a.length; i++) {
                a[i].classList.remove('Nav__Link--active');
            }

            element.classList.add('Nav__Link--active');
        }

        window.smoothScroll = function(element, target) {
            var scrollContainer = target;
            isScrolling = true;

            addActiveClass(element);

            do {
                scrollContainer = scrollContainer.parentNode;
                if (!scrollContainer) {
                    return
                };
                scrollContainer.scrollTop += 1;
                
            } while (scrollContainer.scrollTop == 0);

            var targetY = 0;
            do {
                if (target == scrollContainer) {
                    break
                };
                targetY += target.offsetTop;
            } while (target = target.offsetParent);

            scroll = function(c, a, b, i) {
                i++; if (i > 30) {
                    isScrolling = false;
                    return
                };
                c.scrollTop = a + (b - a) / 30 * i;
                setTimeout(function(){ 
                    scroll(c, a, b, i); 
                }, 20);
            }

            scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
        }

        function elementInViewport(el) {
            var top = el.offsetTop;
            var left = el.offsetLeft;
            var width = el.offsetWidth;
            var height = el.offsetHeight;

            while(el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
            );
        }


