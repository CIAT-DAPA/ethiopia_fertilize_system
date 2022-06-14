import React from 'react';

import './About.css';

function About() {

    return (
        <section className='d-flex h-100 text-center'>
            <div className='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column'>
                <main className='px-3'>
                    <h1 className='text-center'>About</h1>
                    <p class="lead">
                        NextGenAgroadvisry is a project designed to develop site, context, and climate specific
                        agricultural advisories particularly in fertilizer application,
                        integrated soil fertility management (ISFM), climate information service,
                        climate smart agricultural activities (CSA) and other agricultural investment in Ethiopia.
                        <br />
                        <br />
                        It is a project by the Alliance of Bioversity International and CIAT in partnership with support of SSHI 
                        (GIZ-Ethiopia) (BMGF), EiA (oneCGIAR initiative), and AICCRA (World Bank).
                    </p>
                    
                    <h1 className='text-center'>Acknowledgements</h1>
                </main>
            </div>
        </section>
    );
}

export default About;