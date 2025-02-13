'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectAllFromAttributes, selectAllFromCategories } from "@/actions/form-data";
import AttributeIcon from "@/components/attribute-icon";
import ToggleButton from "@/components/toggle-button";

const DataIntakeForm: React.FC = () => {
  const [selectedAttributes, setSelectedAttributes] = useState<Set<string>>(new Set());
  // TODO: Remove any
  const [categories, setCategories] = useState<any[] | null>(null);
  const [attributes, setAttributes] = useState<any[]>([]);

  // Fetch data
  useEffect(() => {
    let mounted = true; // To ensure state updates only when mounted

    async function getAllData() {
      try {
        const [categoriesDb, attributesDb] = await Promise.all([
          selectAllFromCategories(),
          selectAllFromAttributes()
        ]);

        if (mounted) {
          setCategories(categoriesDb);
          setAttributes(attributesDb);
        }
      } catch (err) {
        console.error("Error fetching table data:", err);
        if (mounted) setCategories([]);
      }
    }

    getAllData();
    return () => { mounted = false; };
  }, []);

  // Memoize the attribute map for O(1) lookups
  const attributesByCategory = useMemo(() => {
    const map = new Map();
    if (attributes.length && categories) {
      categories.forEach(category => {
        map.set(
          category.id,
          attributes.filter(attr => attr.category_id === category.id)
        );
      });
    }
    return map;
  }, [categories, attributes]);

  // Optimize toggle handler
  // TODO: The set is not being updated when a new attribute is toggled
  const handleToggle = useCallback((attributeId: string) => {
    setSelectedAttributes(prev => {
      const next = new Set(prev);
      if (next.has(attributeId)) {
        next.delete(attributeId);
      } else {
        next.add(attributeId);
      }
      return next;
    });
  }, []);

  if (categories === null) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4">
        <p className="text-center text-gray-600">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="columns-1 md:columns-2 space-y-4">
        {categories.map(category => {
          const categoryAttributes = attributesByCategory.get(category.id) || [];
          if (categoryAttributes.length === 0) return null;

          return (
            <Card key={category.id} className="break-inside-avoid">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-2">
                  {categoryAttributes.map(attr => (
                    <ToggleButton
                      key={attr.id}
                      value={attr.id}
                      isSelected={selectedAttributes.has(attr.id)}
                      onChange={handleToggle}
                    >
                      <span className="flex items-center gap-0.5">
                        <AttributeIcon category={category.name} attribute={attr.name} />
                        {attr.name}
                      </span>
                    </ToggleButton>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(DataIntakeForm);
