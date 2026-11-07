export type SeatStatus = 'available' | 'occupied' | 'reserved';
export type Seat = { id:string; floor:number; zone:string; type:'Quiet'|'Standard'|'Window'; status:SeatStatus; features:string[] };
export type Room = { id:string; name:string; floor:number; capacity:number; features:string[]; status:'Available'|'In use' };
export type Booking = { id:string; resourceId:string; resourceName:string; type:'Seat'|'Room'; date:string; start:string; end:string; name:string; createdAt:string };
export const initialSeats: Seat[] = Array.from({length:54},(_,i)=>{
 const n=i+1; const occupied=[2,3,6,8,9,13,15,17,20,22,25,27,30,32,34,38,41,43,46].includes(n);
 const reserved=[5,12,19,29,36,44].includes(n);
 return {id:`${String.fromCharCode(65+Math.floor(i/12))}${String((i%12)+1).padStart(2,'0')}`,floor:i<24?1:2,zone:i<12|| (i>=24&&i<36)?'Quiet Zone':i<24||i>=36?'Open Study':'',status:occupied?'occupied':reserved?'reserved':'available',type:n%5===0?'Window':n%3===0?'Quiet':'Standard',features:n%5===0?['Window','Power']:n%3===0?['Quiet','Power']:['Power']};
});
export const rooms: Room[] = [
 {id:'R-01',name:'Collaboration Room 1',floor:1,capacity:4,features:['Whiteboard','Display','Power'],status:'Available'},
 {id:'R-02',name:'Collaboration Room 2',floor:1,capacity:6,features:['Whiteboard','Display','Video call'],status:'In use'},
 {id:'R-03',name:'Focus Pod 1',floor:2,capacity:2,features:['Soundproof','Power'],status:'Available'},
 {id:'R-04',name:'Focus Pod 2',floor:2,capacity:2,features:['Soundproof','Power'],status:'Available'},
 {id:'R-05',name:'Project Studio',floor:2,capacity:8,features:['Whiteboard','Display','Video call'],status:'Available'}
];
export const weekly = [{day:'Mon',value:62},{day:'Tue',value:74},{day:'Wed',value:81},{day:'Thu',value:68},{day:'Fri',value:91},{day:'Sat',value:48},{day:'Sun',value:35}];
