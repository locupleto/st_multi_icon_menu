import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import React, { useEffect, useState } from "react";
import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib";
import * as AllIcons from "@ant-design/icons";
import { ComponentType } from "react";
import { Helmet } from "react-helmet";

// Create a mapping of all available Ant Design icons
const Icons: Record<string, ComponentType<any>> = {};
Object.keys(AllIcons).forEach((key) => {
  Icons[key as keyof typeof AllIcons] = AllIcons[
    key as keyof typeof AllIcons
  ] as ComponentType<any>;
});

interface MenuItem {
  key: string;
  label: string | null;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group" | "divider" | "text" | null; // added "text" type
  disabled?: boolean;
}

function parseMenuItems(
  data: any[],
  iconSize: string,
  iconMinWidth: string
): MenuItem[] {
  return data.map((item: any) => {
    const menuItem: MenuItem = {
      key: item.key,
      label: item.label === null ? null : "",
      icon: undefined,
      children: item.children
        ? parseMenuItems(item.children, iconSize, iconMinWidth)
        : undefined,
      type: item.type || undefined,
      disabled: item.disabled ? true : false,
    };

    if (item.icon) {
      try {
        if (item.icon.startsWith("fa-")) {
          // FontAwesome icon
          menuItem.icon = (
            <div
              style={{
                minWidth: iconMinWidth,
                display: "flex",
                alignItems: "center",
              }}
            >
              <i className={`fa ${item.icon}`} style={{ fontSize: iconSize }} />
            </div>
          );
        } else if (item.icon.startsWith("ad-")) {
          // Ant Design icon
          const iconName = item.icon.substring(3); // Remove the "ad-" prefix
          const Icon = Icons[iconName];
          if (Icon) {
            menuItem.icon = (
              <div
                style={{
                  minWidth: iconMinWidth,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {React.createElement(Icon, {
                  style: { fontSize: iconSize },
                })}
              </div>
            );
          }
        } else {
          // Bootstrap icon (no prefix)
          menuItem.icon = (
            <div
              style={{
                minWidth: iconMinWidth,
                display: "flex",
                alignItems: "center",
              }}
            >
              <i
                className={`bi bi-${item.icon}`}
                style={{ fontSize: iconSize }}
              />
            </div>
          );
        }
      } catch (error) {
        console.warn(`Failed to create icon for "${item.icon}":`, error);
      }
    }

    if (item.label && item.label !== null) {
      if (item.label.match(/<(.*?)>/)) {
        menuItem.label = (
          <span dangerouslySetInnerHTML={{ __html: item.label }}></span>
        ) as unknown as string;
      } else {
        menuItem.label = item.label as string;
      }
    }

    return menuItem;
  });
}

/**
 * A React component that renders an Ant Design menu based on the provided menu data.
 */
const MenuComponent = (props: ComponentProps) => {
  const {
    menu_data,
    key,
    defaultSelectedKeys,
    defaultOpenKeys,
    additionalHeight,
    close_auto,
    multiple,
    css_styling,
    theme,
    menu_click,
    iconSize,
    modus,
    generall_css_styling,
    inlineIndent,
    custom_font_awesome_url,
    iconMinWidth,
  } = props.args;
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys || []);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    defaultSelectedKeys || []
  );
  const [clickOccurred, setClickOccurred] = useState<boolean>(false); // Track if a click occurred
  const rootSubmenuKeys = menu_data.map((item: any) => item.key);

  useEffect(() => {
    // Select the menu element
    const menuElement = document.querySelector(".ant-menu");

    // If the menu exists, observe changes in its size
    if (menuElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          // Set the height when the size of the menu changes
          const height = entry.target.clientHeight;
          Streamlit.setFrameHeight(height + additionalHeight);
        }
      });

      // Start observing
      resizeObserver.observe(menuElement);

      // Cleanup
      return () => {
        resizeObserver.unobserve(menuElement);
      };
    }
  }, []);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      if (menu_click == true && clickOccurred) {
        Streamlit.setComponentValue(keys);
      }

      if (close_auto == true) {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      } else {
        setOpenKeys(keys); // Keep all keys
      }
    }
  };

  const onClick = ({ key }: { key: string }) => {
    setClickOccurred(true); // Update the state to indicate a click occurred
    if (multiple) {
      if (selectedKeys.includes(key)) {
        setSelectedKeys(selectedKeys.filter((k) => k !== key));
      } else {
        setSelectedKeys([...selectedKeys, key]);
      }
    } else {
      setSelectedKeys([key]);
    }
  };

  useEffect(() => {
    if (clickOccurred) {
      // console.log("Sending selected keys to Streamlit:", selectedKeys);
      Streamlit.setComponentValue(selectedKeys);
    }
  }, [selectedKeys]);

  return (
    <>
      <Helmet>
        <script
          src={custom_font_awesome_url}
          crossOrigin="anonymous"
          id="font-awesome-icons"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </Helmet>

      <style dangerouslySetInnerHTML={{ __html: generall_css_styling }} />
      <Menu
        id={key}
        mode={modus}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        inlineIndent={inlineIndent}
        style={{
          width: "100%",
          height: "100%",
          borderRight: 0,
          overflow: "auto",
          borderRadius: "10px",
          ...css_styling,
        }}
        theme={theme}
        items={parseMenuItems(menu_data, iconSize, iconMinWidth)}
        multiple={multiple}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        onClick={onClick}
      />
    </>
  );
};

export default withStreamlitConnection(MenuComponent);
