import React from 'react';

import './About.css';

function About() {

    return (
        <section className='d-flex h-100 text-center container'>
            <div className='row mt-4 mb-5'>
                <main className='px-3'>
                    <h2 className='font-link'>About us</h2>
                    <br/>
                    <p className='font-link-body'>
                        NextGenAgroadvisry is a project designed to develop site, context, and climate specific
                        agricultural advisories particularly in fertilizer application,
                        integrated soil fertility management (ISFM), climate information service,
                        climate smart agricultural activities (CSA) and other agricultural investment in Ethiopia.
                        <br />
                        <br />
                        It is a project by the Alliance of Bioversity International and CIAT in partnership with support of SSHI 
                        (GIZ-Ethiopia) (BMGF), EiA (oneCGIAR initiative), and AICCRA (World Bank).
                    </p>
                    
                    <br/>
                    <br/>
                    <br/>
                </main>
            </div>
        </section>
    );
}

export default About;