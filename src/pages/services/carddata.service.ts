export class CardDataService{

    inboxData(){
            
        return[
            {
                title : 'Calender Item',
                url   : 'assets/icon/Calendar Alert.svg',
                count : 13
            },
            {
                title : 'Project Alert',
                url   : 'assets/icon/Project Alert.svg',
                count : 31
            },
            {
                title : 'Certification Alert',
                url   : 'assets/icon/Certification Alert.svg',
                count : 12
            }
        ];
    
    }
    
    timelineData(){
    
        return [
            {
                title : 'Event',
                url   : 'assets/icon/Calendar Alert.svg',
                count : 10
            },
            {
                title : 'Milestone',
                url   : 'assets/icon/Project Alert.svg',
                count : 20
            },
            {
                title : 'Caution',
                url   : 'assets/icon/Certification Alert.svg',
                count : 2
            }
        ];
    
    }
    

}