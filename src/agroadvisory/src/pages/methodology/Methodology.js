import React from "react";
import methodology from "../../assets/images/methodology.png"

function Methodology() {
  return (
    <main>
      <br />
      <section className="row">
        <div className="col-lg-12">
          <h2 className="text-center font-link">Methodology</h2>
          <h4 className="font-link">Overview</h4>
          <p class="font-link-body">
            NextGen Agroadvisory is a tool developed to provide location,
            context, and climate specific agricultural advisories particularly
            related to optimal fertilizer application, integrated soil fertility
            management (ISFM), climate information service, climate smart
            agricultural activities (CSA), pest and disease surveillance, and
            other agricultural investments to different user groups. The app
            provides both pixel level information and generates reports based on
            kebele and woreda levels.The data used in the web app is produced
            based on different methodologies:
          </p>
          <h4 className="font-link ps-3"> 1. Fertilizer</h4>
          <p class="font-link-body">
            The fertilizer data stored in the system consists of both elemental
            and <span class="text-danger">compound</span> fertilizer nutrients. It includes n, p, urea, nps,
            compost and vermi-compost. The output is produced based on machine
            learning algorithm. First an input data which consists of the
            fertilizer and treatment historical information collected, cleaned
            and harmonized by CoW (Coalition of the Willing) and raster
            covariates of soil, topography and climate were used. Then a random
            forest machine learning algorithm is used to calibrate the model and
            a prediction grid for the three different scenarios (i.e. normal,
            above normal and below normal) was developed. Finally, a prediction
            was made to generate the outputs based on the different scenarios.
            You can see the R source code here at <a href="#">github</a>. In addition to
            generate a report based on the admin levels the average values of
            fertilizer recommendations were calculated by kebele boundaries.
            Please see the workflow below.
          </p>
          <div class="d-flex justify-content-center my-4">
            <img alt="methodology" src={methodology} role="img" />
          </div>
          
        </div>
      </section>
    </main>
  );
}

export default Methodology;