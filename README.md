## DashboardCrime
This is a group project I made alone for the Information Visualization course at the VUB.

- [DashboardCrime](#dashboardcrime)
  - [Design Prototypes](#design-prototypes)
  - [Project Structure](#project-structure)
    - [Python Notebook](#python-notebook)
    - [React](#react)
  - [Notable libraries](#notable-libraries)
  - [Notable Decisions](#notable-decisions)
  - [Future work](#future-work)


### Design Prototypes
The design prototypes can be found [here](https://www.figma.com/file/0YprOmBCj3OOZh0XUd8U2W/Infovis?type=design&node-id=0-1&mode=design).

### Project Structure
#### Python Notebook
1. Data collection 
2. Pre-processing via notebooks & GeoJson conversion
3. Explorative Data Analysis
#### React
4. Loading preprocessed data into memory on server side
5. Optimized server-side filtering technique
6. Precalculating various statistics based on heuristics and storing them in-memory
7. Use caching to avoid filtering data multiple times if the same filters have been selected recently.
8. Client async calls to server for data.

### Notable libraries
- GEOJSON for visualizing the districts of Los Angeles and create a heatmap
- recharts/apex charts for creating interactive charts (apexcharts used for corr-matrix)
- Leaflet to create the map 


### Notable Decisions
1. Data Collection
    - Since data is updated every month, re-running the notebook would scrape the updated data from the web and pre-process this data and therefore allow for fresh data in the backend.
2. Pre-processing
    - To avoid cluttering the visualizations with possible non-notable crimes, we decided to filter out crimes that happen less than 5% of the time. This originally was at 1% but this felt low so it was increased to 5%. The reason for this is that no statistically sound decisions are likely to be made from analyzing infrequent crimes. 
    - We observed that the data had various misencondings:
      - There were random additional genders 'H' and 'N'. We assumed 'N' to be a typo for the Male gender due to its proximity to the letter 'M' on the keyboard. We added 'H' to the 'Unknown' genders as no reasonable assumption could be made there. We note that only ~200 instances contained these gender misencondings
      - Certain crime, features, or weapon descriptions varied in encoding by an additional space, typos, and such things. These were manually handled and are described in the notebook itself.
    - We filtered out crimes that contained a combination of 'null' or 'Unknown' values for all the victim description columns. If an instance had no description of a victim, we assumed this to be a victimless crime and therefore filtered it out.
      - Instances that still contained 'null' values for victim description columns after filtering out victimless crimes were adjusted to their appropriate 'Unknown' values.
    - All the columns with difficult labels or descriptions were mapped (manually) to more readable labels with hierarchy. E.g. "THEFT OF IDENTITY" was mapped to "Theft::Identity Theft". Similarly, the 'C' ethnicity is mapped to 'Asian::Chinese'
      - For the Status of the case itself, no information was given about the meaning of these so we researched possible meanings.
    - Since the GEOJSON data was nowhere to be found, I had to use a different format and convert it manually
3. We performed a simple EDA to observe the distribution of various features so that we could design the mid fidelity prototype with powerful visualizations based on knowledge of the data.

4. We load the data in memory as using a database would slow down the speed of processing queries. Additionally this makes the project self-sustaining such that if the database were to be down, we would not be affected. We note that this is only possible since our data becomes managably large after processing (~2M instances). 
5. Since we work with bigger data, processing and filtering the data can be slow. Therefore I tried to optimize this as much as possible. When the data is loaded in on the server, an index is made which keeps tracks of where a new year starts in my data. This can be done since I have sorted my data in the pre-processing step. This way I can use this index to instantly slice my data to only the instances of that year. This offered a ~90% speedup to processing queries, which can be seen in the following image.

<div style="text-align: center;">
    <img src="images/speedup.png" alt="Speed up example" width="500" height="80">
</div>

6. Since processing larger data can be slow, we pre-processed general statistics for only the various base filters, these are filters where the data is only filtered on a specific year. If the user selects more filters these will be processed at run-time.
7. Since users would select filters and possibly revert to the previous filter, we optimized our server to not have to filter all the data again by caching ten of the most frequently used filter combinations by the user on the server and storing the accompanying filtered data. 

8. /

Additional: Sorting of dropdown menus to help with consistency and help with finding filters easier. Color schemes are color-blind proof, though not white-black proof.


### Future work
- As data gets updated monthly, we could use a pipeline to run our notebook and update our csv and re-run our server to automate fresh data capturing
- Various pre-processing steps such as the mapping of crimes, ethnicities and so on are done manually. Big shifts in trends such as an increase in an uncommon crime (that has not been mapped) would lead to unmapped text to be visualized on the front end.
- Dropdowns are currently grouping various aspects of the instances, such as crime/ethnicity/... based on super-class. This means that people can not access more specific instances of a crime, e.g. if people want to access "Theft from a Motor Vehicle", users could only access "Theft" and all the sub-categories of "Theft" would be selected as well. Multi-dropdowns could be created to avoid these generalizations.
- Improve data processing speed on the server side by implementing eclairjs to use spark to manipulate big data or use multithreading.
- Load data into a database and only add new instances to the database when fetching fresh data.
