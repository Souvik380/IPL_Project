
const csv=require('csvtojson')

//Question 1
async function MATCHES(){
    
    const files=await csv().fromFile("matches.csv")

    const dict={}
    for(let i=0;i<files.length;i++){
        let year=files[i].season
        
        if(dict[year]){
            dict[year]+=1
        }else{
            dict[year]=1
        }
    }
    return dict
}

//Question 2
async function WINNER(){
    
    const files=await csv().fromFile("matches.csv")

    const dict={}
    for(let i=0;i<files.length;i++){
        let year=files[i].season
        let winner=files[i].winner
        dict[year]=winner
    }
    return dict
}

//Question 3
async function EXTRA_RUN(){
    
    const matches=await csv().fromFile("matches.csv")
    const deliveries=await csv().fromFile("deliveries.csv")

    let match2016ID=[]
    const dict={}

    for(let i=0;i<matches.length;i++){
        let year=matches[i].season
        if(year==="2016"){
            match2016ID.push(matches[i].id)
        }
    }

    for(let i=0;i<deliveries.length;i++){
        let match_id=deliveries[i].match_id

        if(match2016ID.includes(match_id)){
            let bowling_team=deliveries[i].bowling_team
            
            if(dict[bowling_team]){
                dict[bowling_team]+=parseInt(deliveries[i].extra_runs)
            }else{
                dict[bowling_team]=parseInt(deliveries[i].extra_runs)
            }
        }
    }

    return dict
}

//Question 4
async function ECON_BOWLER(){
    
    async function overs(bowler){
        let balls=0
        
        for(let i=0;i<deliveries.length;i++)
        {
            if(match2015ID.includes(deliveries[i].match_id)){
                if(deliveries[i].bowler===bowler){
                    balls+=1
                }
            }
        }
        return balls/6
    }

    const matches=await csv().fromFile("matches.csv")
    const deliveries=await csv().fromFile("deliveries.csv")

    let match2015ID=[]
    const dict={}

    for(let i=0;i<matches.length;i++){
        let year=matches[i].season
        if(year==="2015"){
            match2015ID.push(matches[i].id)
        }
    }

    for(let i=0;i<deliveries.length;i++){
        let match_id=deliveries[i].match_id

        if(match2015ID.includes(match_id)){

            let bowler=deliveries[i].bowler
            let runs=parseInt(deliveries[i].total_runs)

            if(dict[bowler]){
                dict[bowler]+=runs
            }else{
                dict[bowler]=runs
            }
        }
    }

    for(let key in dict){
        dict[key]=Math.round(dict[key]/6);
    }

    
     let economy = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
      }).sort(function(a, b){ return a[1] - b[1]; });

    return economy
}

let matches=MATCHES()

matches.then((match)=>{
    console.log("Number of matches played per year of all the years in IPL")
    console.log(match)
}).catch((err)=>{
    console.log(err)
})

let winners=WINNER()

winners.then((data)=>{
    console.log("Number of matches won of all teams over all the years of IPL.")
    console.log(data)
}).catch((err)=>{
    console.log(err)
})


let runs=EXTRA_RUN()

runs.then((data)=>{
    console.log("For the year 2016 get the extra runs conceded per team.")
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

let bowlers=ECON_BOWLER()
bowlers.then((data)=>{
    console.log("For the year 2015 get the top economical bowlers.")
    data.reverse()
    for(let i=0;i<10;i++){
        console.log(data[i])
    }
}).catch((err)=>{
    console.log(err)
})