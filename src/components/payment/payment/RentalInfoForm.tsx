import { format } from "date-fns";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../../lib";
import { useRentalInfoForm } from "../../../hooks";
import { SectionCards } from "../../sectionCar/SectionCards";
import { PaymentSectionHeader } from "./PaymentSectionHeader";
import type { RentalInfoSchemaType } from "../../../schemas";
import { hoursOfDay } from "@/data";
import { dataCities } from "@/data/city.data";
import { SelectFieldForm } from "@/components/form/SelectFieldForm";

interface RentalInfoFormProps {
  defaultValues: RentalInfoSchemaType
  onSubmit: (values: RentalInfoSchemaType) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const cities = dataCities
const hours = hoursOfDay.map((hour) => ({ id: hour, description: hour }))

export const RentalInfoForm: React.FC<RentalInfoFormProps> = ({ defaultValues, onSubmit, setStep }) => {
  const form = useRentalInfoForm(defaultValues)

  const onClickPrevious = () => {
    setStep((prev) => prev - 1)
  }

  return (
    <section className="bg-card ">
      <Form {...form}>
        <PaymentSectionHeader
          title="Rental Info"
          description="Please select your rental date"
          stepLabel={2}
        />

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
        >
          <SectionCards className="grid grid-cols-0 sm:grid-cols-0 gap-7 ">
            {/* Pick Up */}
            <h1 className="font-bold">Pick - Up</h1>

            <SectionCards className="grid grid-cols-0 sm:grid-cols-2 items-center gap-7 p-0">
              {/* pick-up location */}
              <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                  <SelectFieldForm 
                    field={field}
                    label="Locations"
                    placeholder="Select your city"
                    data={cities}
                  />
                )}
              />

              {/* pick-up date */}
              <FormField
                control={form.control}
                name="pickUpDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecciona tu fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            //date > new Date() || 
                            date < new Date("1900-01-01")
                          }

                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* pick-up time */}
              <FormField
                control={form.control}
                name="pickUpTime"
                render={({ field }) => (
                  <SelectFieldForm
                    field={field}
                    label="Time"
                    placeholder="Select your time"
                    data={hours}
                  />
                )}
              />
            </SectionCards>

            {/* Drop off */}

            <h1 className="font-bold">Drop - Off</h1>

            <SectionCards className="grid grid-cols-0 sm:grid-cols-2 items-center gap-7 p-0">
              {/* drop-off location */}
              <FormField
                control={form.control}
                name="dropOffLocation"
                render={({ field }) => (
                  <SelectFieldForm 
                    field={field}
                    label="Locations"
                    placeholder="Select your city"
                    data={cities}
                  />
                )}
              />

              {/* drop-off date */}
              <FormField
                control={form.control}
                name="dropOffDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecciona tu fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            // date > new Date() || date < new Date("1900-01-01")
                            date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* drop-off time */}
              <FormField
                control={form.control}
                name="dropOffTime"
                render={({ field }) => (
                  <SelectFieldForm
                    field={field}
                    label="Time"
                    placeholder="Select your time"
                    data={hours}
                  />
                  
                )}
              />
            </SectionCards>

            <SectionCards className="flex justify-end gap-7">
              <Button variant={"link"} type="button" onClick={onClickPrevious}>Regresar</Button>
              <Button variant={"default"} type="submit">Continuar</Button>
            </SectionCards>

          </SectionCards>
        </form>
      </Form>
    </section>
  );
};
