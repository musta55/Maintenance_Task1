using System;

namespace CyclomaticComplexityExample
{
    class Program
    {
        static void Main(string[] args)
        {
            int number = Convert.ToInt32(Console.ReadLine());

            if (number > 0)
            {
                Console.WriteLine("Number is positive.");
            }
            else if (number < 0)
            {
                Console.WriteLine("Number is negative.");
            }
            else
            {
                Console.WriteLine("Number is zero.");
            }

            if (number % 2 == 0)
            {
                Console.WriteLine("Number is even.");
            }
            else
            {
                Console.WriteLine("Number is odd.");
            }
        }
    }
}
