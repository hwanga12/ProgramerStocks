import AssetList from "@/components/asset/AssetList";
import AssetSummary from "@/components/asset/AssetSummary";
import { useAssetStore } from "@/store/assetStore";
import styled from "styled-components";
import { useEffect } from "react";

const Assets = () => {
  const { cash, totalAsset, stocks, fetchAssets } = useAssetStore();

  useEffect(() => {
    fetchAssets();
  }, []);

  const isLoading = stocks.length === 0 && totalAsset === 0 && cash === 0;

  if (isLoading) return <AssetsStyle>로딩 중...</AssetsStyle>;

  return (
    <AssetsStyle>
      <AssetSummary portfolio={{ cash, totalAsset, stocks }} />
      <div className="divider" />
      <AssetList portfolio={{ cash, totalAsset, stocks }} />
    </AssetsStyle>
  );
};

const AssetsStyle = styled.div`
  display: flex;
  flex-direction: column;

  .divider {
    margin-bottom: 15px;
  }
`;

export default Assets;
