"use client"

import React, { createContext, useContext, ReactNode } from 'react';

type FormuleMap = Record<string, number>;

const FormuleContext = createContext<FormuleMap>({});

export function useFormule() { return useContext(FormuleContext); }

export function FormuleProvider({ children }: { children: ReactNode; }) {
    return (
        <FormuleContext.Provider
            value={{
                seance_decouverte: 19758, 
                seance_unite: 19759, 



                carnet_10: 21421, 
                carnet_30: 21423, 
                carnet_50: 21428, 
                carnet_100: 21429, 
                


                classic_unmois: 21408, 
                classic_mensuel: 19872, 
                classic_annuel: 19871, 



                boost_unmois: 19912, 
                boost_mensuel: 21467, 
                boost_annuel: 19915, 

                boost_smallgroups_unmois: 19914, 
                boost_smallgroups_mensuel: 21468, 
                boost_smallgroups_annuel: 19913,



                aqua_unmois: 19919, 
                aqua_mensuel: 21469, 
                aqua_annuel: 19918, 

                aqua_coursco_unmois: 20811, 
                aqua_coursco_mensuel: 21470,
                aqua_coursco_annuel: 20812, 

                aqua_coursco_smallgroups_unmois: 19916, 
                aqua_coursco_smallgroups_mensuel: 21471,
                aqua_coursco_smallgroups_annuel: 19917, 

                danse: 19926, 
            }}
        >
            {children}
        </FormuleContext.Provider>
    );
}