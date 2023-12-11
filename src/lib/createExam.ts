import WordEntity from '../data/entity/WordEntity.ts';

export const createExam= (data?:WordEntity[],type:string)=>{
	let engs:string[] = []
	let kors:string[] = []
	if(!data) return {q:null,a:null}
	console.log("daa",data);
	data.map(item=>{
		engs.push(item.eng)
		kors.push(item.kor)
	})
	console.log(kors,engs);
	if(type==='korToeng') {
		return {
			q:kors,
			a:engs
		}
	}else if(type==="engTokor"){
		return {
			q:engs,
			a:kors,
		}
	}
	else{
		return {
			q:null,
			a:null
		}
	}

}