public class missing {
    public static void main(String[] args) {

        int sum = 0;
        int arr[] = { 1, 2, 4, 5 };

        
      int k=arr.length+1;
        int totalSum = k* (k+ 1) / 2;
      
       for (int i : arr) {
          sum += i;
       }
      System.out.println(totalSum-sum);
    
    }
}